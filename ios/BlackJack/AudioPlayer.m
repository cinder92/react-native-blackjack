//
//  AudioPlayer.m
//  Rancherita
//
//  Created by Dante Cervantes on 06/12/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "AudioPlayer.h"
#import <AVFoundation/AVFoundation.h>

@implementation AudioPlayer

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(canPlay:(RCTResponseSenderBlock)callback){
  if(self.audioPlayer == nil){
    callback(false);
  }else{
    bool canPlay = (self.audioPlayer.status == AVPlayerStatusReadyToPlay);
    NSArray *array = @[[NSNumber numberWithBool:canPlay]];
    callback(@[array]);
  }
}

RCT_EXPORT_METHOD(getVolume:(RCTResponseSenderBlock)callback){
  float playerVolume = [self.audioPlayer volume];
  NSArray *array = @[[NSNumber numberWithFloat:playerVolume]];
  callback(@[array]);
}


RCT_EXPORT_METHOD(loadAudio:(NSString *)audioPath){
  
  //verify if its a url
  NSURL *audioUrl = [NSURL URLWithString:audioPath];
  NSURL *url;
  if(audioUrl && audioUrl.scheme && audioUrl.host){
    NSString *urlString = [NSString stringWithFormat:@"%@", audioPath];
    url = [NSURL URLWithString:[urlString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
  }else{
    //play static files
    //NSString *_urlString = [NSString stringWithFormat:@"%@/sound.mp3",[[NSBundle mainBundle] resourcePath]];
    NSString *urlPath = [[NSBundle mainBundle] resourcePath];
    NSString *audioResources = [NSString stringWithFormat:@"%@", urlPath];
    NSString *_audioPath = [NSString stringWithFormat:@"/%@",audioPath];
    
    NSString *_finalPath = @"";
    _finalPath = [_finalPath stringByAppendingString:audioResources];
    _finalPath = [_finalPath stringByAppendingString:_audioPath];
    
    url = [NSURL fileURLWithPath:_finalPath];
  }
  
  AVPlayerItem *playerItem = [AVPlayerItem playerItemWithURL:url];
  
  self.audioPlayer = [[AVPlayer alloc] initWithPlayerItem : playerItem];
  
  self.isPlaying = @"false";
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(playbackFinished:)                                                     name:AVPlayerItemDidPlayToEndTimeNotification
                                             object:self.audioPlayer.currentItem];

}

-(void)playbackFinished:(NSNotification *)notification{
  [self.audioPlayer seekToTime:CMTimeMake(0, 1)];//replay from start
  [self.audioPlayer play];
}

RCT_EXPORT_METHOD(play){
  [self.audioPlayer play];
   self.isPlaying = @"true";
}

RCT_EXPORT_METHOD(playing:(RCTResponseSenderBlock)callback)
{
  NSString *isPlaying;
  if(self.isPlaying == nil){
    isPlaying = @"false";
  }else{
    isPlaying = self.isPlaying;
  }
  
  //NSLog(@"%@",isPlaying);
  callback(@[isPlaying]);
}


RCT_EXPORT_METHOD(pause){
  [self.audioPlayer pause];
  [self.audioPlayer cancelPendingPrerolls];
  self.audioPlayer = nil;
  self.isPlaying = @"false";
}

RCT_EXPORT_METHOD(setVolume:(float *)volume){
  [self.audioPlayer setVolume: *volume];
}

@end

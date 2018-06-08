//
//  AudioPlayer.h
//  Rancherita
//
//  Created by Dante Cervantes on 06/12/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <React/RCTBridge.h>
#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>

@interface AudioPlayer : NSObject <RCTBridgeModule>

@property(nonatomic, strong) AVPlayer *audioPlayer;
@property(nonatomic, strong) NSString *isPlaying;


@end

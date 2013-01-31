//
//  ViewController.m
//  Attendar
//
//  Created by Scott Brugmans on 31-01-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import "ViewController.h"
#import <Parse/Parse.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    PFUser *currentUser = [PFUser currentUser];
    
    if (!currentUser.email)
    {
        NSLog(@"Asking cloud to fetch user data from Facebook");
        
        [PFCloud callFunctionInBackground:@"pullFacebookData" withParameters:[NSDictionary new] block:^(id object, NSError *error) {
            if (!error)
            {
                NSLog(@"Cloud fetched user data, now requesting refresh");
                [[PFUser currentUser] refreshInBackgroundWithBlock:^(PFObject *object, NSError *error) {
                    if (!error) {
                        NSLog(@"Local user data refreshed.");
                    }
                }];
                
            }
        }];

        
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end

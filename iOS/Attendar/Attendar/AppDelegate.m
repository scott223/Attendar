//
//  AppDelegate.m
//  Attendar
//
//  Created by Scott Brugmans on 31-01-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import <Parse/Parse.h>
#import "AppDelegate.h"

#import "ViewController.h"

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [Parse setApplicationId:@"anWQYBQ68ZoMzuY1OO7245FXLcuwemmeP8fYfi75"
                  clientKey:@"j9HrhQ1R6BQVYb4KHJPJh1QrpEuDfOhWN9cu206c"];
    
    [PFFacebookUtils initializeWithApplicationId:@"411385308948110"];
    // ****************************************************************************
    
    [PFUser enableAutomaticUser];
    
    PFACL *defaultACL = [PFACL ACL];
    
    // If you would like all objects to be private by default, remove this line.
    [defaultACL setPublicReadAccess:YES];
    [PFACL setDefaultACL:defaultACL withAccessForCurrentUser:YES];
    
    [PFUser logOut];
    
    // Override point for customization after application launch.
    
    NSLog(@"Good morning SB");
    
    PFUser *currentUser = [PFUser currentUser];
    if ([currentUser username]) {
        
        NSString *name = [currentUser objectForKey:@"username"];
        NSLog(@"User (%@) already present, no login needed, pushing  navigator", name);
        
        [self pushTabBar];
        
    } else {
        NSLog(@"No user, signing in user with facebook");
        
        NSArray *permissions = [[NSArray alloc] initWithObjects:@"user_about_me",@"email", nil];
        
        [PFFacebookUtils logInWithPermissions:permissions block:^(PFUser *user, NSError *error) {
            if (!user) {
                NSLog(@"Uh oh. The user cancelled the Facebook login.");
                
                UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Facebook nodig"
                                                                message:@"Je moet inloggen met je Facebook account om gebruik te maken van deze app."
                                                               delegate:self
                                                      cancelButtonTitle:@"OK"
                                                      otherButtonTitles:nil];
                [alert show];
                
            } else {
                NSLog(@"User logged in through Facebook, pushing navigator");
                
                [self pushTabBar];
                
            }
        }];
        
    }

    return YES;
}

- (void)pushTabBar
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    // Override point for customization after application launch.

    UITabBarController *tabBarController = [[UITabBarController alloc] init];
    
    ViewController *nav = [[ViewController alloc] initWithNibName:@"ViewController" bundle:nil];    
    
    NSArray *controllers = [NSArray arrayWithObjects:nav, nil];
    
    tabBarController.viewControllers = controllers;
    
    NSLog(@"pushing main view controller");  
    
    [self.window setRootViewController:tabBarController];
    [self.window makeKeyAndVisible];
    
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [PFFacebookUtils handleOpenURL:url];
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end

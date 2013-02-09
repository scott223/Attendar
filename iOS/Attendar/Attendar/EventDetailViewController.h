//
//  EventDetailViewController.h
//  Attendar
//
//  Created by Scott Brugmans on 09-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface EventDetailViewController : UIViewController <UITableViewDelegate, UITableViewDataSource> {
    IBOutlet UILabel *lblText;
    IBOutlet UILabel *lblDate;
    IBOutlet UILabel *lblLocation;
    NSDictionary *event;
    UITableView *invitesTable;
    IBOutlet UISwitch *responseSwitch;
}

@property (nonatomic, retain) NSDictionary *event;
@property (nonatomic, retain) UITableView *invitesTable;
@property (nonatomic, retain) UISwitch *responseSwitch;

- (IBAction) toggleEnabledForResponseSwitch: (id) sender;

@end

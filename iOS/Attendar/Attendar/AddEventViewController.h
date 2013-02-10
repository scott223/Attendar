//
//  AddEventViewController.h
//  Attendar
//
//  Created by Scott Brugmans on 10-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//


#import <UIKit/UIKit.h>
#import <Parse/Parse.h>
#import "RecurrenceViewController.h"

@protocol EventAddDelegate;

@interface AddEventViewController : UIViewController <RecurrenceDelegate, PF_FBFriendPickerDelegate, UISearchBarDelegate, UITableViewDelegate, UITableViewDataSource, UITextInputDelegate, UIActionSheetDelegate> {
    IBOutlet UITextField *eventTitle;
    IBOutlet UITextField *eventLocation;
    id <EventAddDelegate> delegate;
    IBOutlet UITableView *settingsTable;
    
    UIActionSheet *sheet;

}

@property (retain, nonatomic) PF_FBFriendPickerViewController *friendPickerController;
@property (retain, nonatomic) UISearchBar *searchBar;
@property (retain, nonatomic) NSString *searchText;
@property (retain, nonatomic) UIButton *selectFriends;

@property (retain, nonatomic) NSMutableArray *invitedFriends;
@property (retain, nonatomic) NSString *recurringType;
@property (retain, nonatomic) NSNumber *recurringNumber;

@property (retain, nonatomic) id <EventAddDelegate> delegate;

@end

@protocol EventAddDelegate <NSObject>
// recipe == nil on cancel
- (void)addEventViewController:(AddEventViewController *)addEventViewController didAddEvent:(NSMutableDictionary *)event;

@end
//
//  AddEventViewController.m
//  Attendar
//
//  Created by Scott Brugmans on 10-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import "AddEventViewController.h"
#import <Parse/Parse.h>

#import "RecurrenceViewController.h"

@interface AddEventViewController ()

@end

@implementation AddEventViewController

@synthesize selectFriends, invitedFriends, recurringType, recurringNumber, delegate;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

-(void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];

    
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    if (self.friendPickerController == nil) {
        // Create friend picker, and get data loaded into it.
        self.friendPickerController = [[PF_FBFriendPickerViewController alloc] init];
        self.friendPickerController.title = @"Select Friends";
        self.friendPickerController.delegate = self;
    }
    
    [self.friendPickerController loadData];
    [self.friendPickerController clearSelection];
    
    invitedFriends = [[NSMutableArray alloc] init];
    
    self.title = @"Add new event";
    
    [self stopLoadingAnimation];
    
    UIBarButtonItem *button = [[UIBarButtonItem alloc]
                               initWithBarButtonSystemItem:UIBarButtonSystemItemCancel
                               target:self
                               action:@selector(cancelEvent)];
    self.navigationItem.leftBarButtonItem = button;
    
    recurringType = @"Single";
    recurringNumber = [[NSNumber alloc] initWithInt:1];
    
    
    
}

- (void)stopLoadingAnimation
{
    UIBarButtonItem *button = [[UIBarButtonItem alloc]
                               initWithBarButtonSystemItem:UIBarButtonSystemItemSave
                               target:self
                               action:@selector(saveEvent)];
    self.navigationItem.rightBarButtonItem = button;
}

-(void)startLoadingAnimation
{
    UIActivityIndicatorView *ai = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:ai];
    [ai startAnimating];
}

- (void) saveEvent
{
    [self startLoadingAnimation];
    
    NSLog(@"Saving new event...");
    
    NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
    [params setObject:[eventTitle text] forKey:@"title"];
    [params setObject:[eventLocation text] forKey:@"location"];
    [params setObject:@"daily" forKey:@"recurring"];
    [params setObject:[NSDate date] forKey:@"start_on"];
    [params setObject:[[NSNumber alloc] initWithInt:2] forKey:@"repeat_every"];
    [params setObject:[[NSDictionary alloc] init] forKey:@"repeat_on"];
    [params setObject:invitedFriends forKey:@"invites"];
    
    
    [PFCloud callFunctionInBackground:@"createEvent" withParameters:params block:^(id object, NSError *error) {
        
        if (!error){
            
            NSLog(@"New event created");
            
            [self stopLoadingAnimation];
            
            [self.delegate addEventViewController:self didAddEvent:object];
            
            // NSLog([events objectAtIndex:0]);
        }
        
        
        
    }];
    
}

- (void) cancelEvent
{

    [self.delegate addEventViewController:self didAddEvent:nil];
    
}
                                                

- (void) handlePicker
{

    [self presentViewController:self.friendPickerController animated:YES completion:^(void){[self addSearchBarToFriendPickerView];}];
    
}

- (void) handlePickerDone
{
    [self dismissViewControllerAnimated:YES completion:NULL];
    [settingsTable reloadData];
    
    
}

- (void) facebookViewControllerCancelWasPressed:(id)sender
{
    NSLog(@"Friend selection was cancelled");
    [self handlePickerDone];
    
}

- (void) facebookViewControllerDoneWasPressed:(id)sender
{

    [invitedFriends removeAllObjects];
    
    for (id<PF_FBGraphUser> user in self.friendPickerController.selection) {
        
        NSMutableDictionary *userDict = [[NSMutableDictionary alloc] init];
        
        [userDict removeAllObjects];
        [userDict setObject:user.id forKey:@"fbID"];
        [userDict setObject:user.name forKey:@"name"];
        
        [invitedFriends addObject:userDict];
        
        NSLog(@"Friend selected: %@", user.id);
    }
    
    [self handlePickerDone];
}

- (void) handleSearch:(UISearchBar *)searchBar {
    [searchBar resignFirstResponder];
    self.searchText = searchBar.text;
    [self.friendPickerController updateView];
}

- (void)searchBarSearchButtonClicked:(UISearchBar*)searchBar
{
    [self handleSearch:searchBar];
}

- (void)searchBarCancelButtonClicked:(UISearchBar *) searchBar {
    self.searchText = nil;
    [searchBar resignFirstResponder];
}

- (BOOL)friendPickerViewController:(PF_FBFriendPickerViewController *)friendPicker
                 shouldIncludeUser:(id<PF_FBGraphUser>)user
{
    if (self.searchText && ![self.searchText isEqualToString:@""]) {
        NSRange result = [user.name
                          rangeOfString:self.searchText
                          options:NSCaseInsensitiveSearch];
        if (result.location != NSNotFound) {
            return YES;
        } else {
            return NO;
        }
    } else {
        return YES;
    }
    return YES;
}

- (void)addSearchBarToFriendPickerView
{
    if (self.searchBar == nil) {
        CGFloat searchBarHeight = 44.0;
        self.searchBar =
        [[UISearchBar alloc]
         initWithFrame:
         CGRectMake(0,0,
                    self.view.bounds.size.width,
                    searchBarHeight)];
        self.searchBar.autoresizingMask = self.searchBar.autoresizingMask |
        UIViewAutoresizingFlexibleWidth;
        self.searchBar.delegate = self;
        self.searchBar.showsCancelButton = YES;
        
        [self.friendPickerController.canvasView addSubview:self.searchBar];
        CGRect newFrame = self.friendPickerController.view.bounds;
        newFrame.size.height -= searchBarHeight;
        newFrame.origin.y = searchBarHeight;
        self.friendPickerController.tableView.frame = newFrame;
    }
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
#warning Potentially incomplete method implementation.
    // Return the number of sections.
    return 2;
    
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
#warning Incomplete method implementation.
    // Return the number of rows in the section.
    switch (section) {
        case 0:
            
            if ([recurringType isEqualToString:@"Single"]) {
                return 1;
            } else {
                return 2;
            }
    
            break;
        
        case 1:
            return 1;
            break;
        default:
            return nil;
            break;
    }
}


- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    switch (section) {
        case 0:
            return @"Recurrence";
            break;
        case 1:
            return @"Friends";
            break;
        default:
            return nil;
            break;
    }
}



- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:CellIdentifier];
    }
    

    switch ([indexPath section]) {
        case 0:
            
            switch ([indexPath row]) {
                case 0:
                    cell.textLabel.text = @"Type";
                    cell.detailTextLabel.text = recurringType;
                    [cell setAccessoryType:UITableViewCellAccessoryDisclosureIndicator];
                    break;
                    
                case 1:
                    cell.textLabel.text = @"Repeats on";
                    //cell.detailTextLabel.text = [[recurringNumber stringValue]stringByAppendingString:@" times"];
                    [cell setAccessoryType:UITableViewCellAccessoryDisclosureIndicator];
                    break;
                    
                default:
                    break;
            }
            
            break;
        case 1:
            
            if ([invitedFriends count] == 0) {
                cell.textLabel.text = @"Invite friends";
            } else {
                cell.textLabel.text = [NSString stringWithFormat:@"%d friends invited", [invitedFriends count]];
            }
            [cell setAccessoryType:UITableViewCellAccessoryDisclosureIndicator];
            break;
        default:
            break;
    }
   

    
    return cell;
}

#pragma mark - Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
   
    RecurrenceViewController *recurrenceView = [[RecurrenceViewController alloc] initWithNibName:@"RecurrenceViewController" bundle:nil];
    recurrenceView.recurrenceType = recurringType;
    
    switch ([indexPath section]) {
        case 0:
            
            switch ([indexPath row]) {
                case 0:
                    
                    sheet = [[UIActionSheet alloc] initWithTitle:@"Select Recurrence Type"
                                                        delegate:self
                                               cancelButtonTitle:@"Cancel"
                                          destructiveButtonTitle:nil
                                               otherButtonTitles:@"Single", @"Daily", @"Weekly", @"Monthly", nil];
                    
                    // Show the sheet
                    [sheet showInView:self.view];
                    
                    break;
                    
                case 1:
                    
                    [self.navigationController pushViewController:recurrenceView animated:YES];
                    
                    break;
                    
                default:
                    break;
            }
            
            break;
        case 1:
            
            switch ([indexPath row]) {
                case 0:
                    [self handlePicker];
                    break;
                    
                default:
                    break;
            }
            
            
            break;
        default:
            break;
    }
    
}

- (void)actionSheet:(UIActionSheet *)actionSheet didDismissWithButtonIndex:(NSInteger)buttonIndex
{
    switch (buttonIndex) {
        case 0:
            recurringType = @"Single";
            break;
            
        case 1:
            recurringType = @"Daily";
            break;
            
        case 2:
            recurringType = @"Weekly";
            break;
            
        case 3:
            recurringType = @"Monthly";
            break;
            
        default:
 
            break;
    }
    
    [settingsTable reloadData];
}

- (BOOL)textFieldShouldReturn:(UITextField *)theTextField {
    [theTextField resignFirstResponder];
    return YES;
}

@end

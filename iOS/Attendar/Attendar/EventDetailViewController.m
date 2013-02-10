//
//  EventDetailViewController.m
//  Attendar
//
//  Created by Scott Brugmans on 09-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import <Parse/Parse.h>
#import "EventDetailViewController.h"

@interface EventDetailViewController ()

@end

@implementation EventDetailViewController

@synthesize event, responseSwitch;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    NSDateFormatter* dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"dd-MM HH:mm"];
    
    lblText.text = [event objectForKey:@"title"];
    lblDate.text = [dateFormatter stringFromDate:[event objectForKey:@"datetime"]];
    lblLocation.text = [event objectForKey:@"location"];
    [invitesTable reloadData];
    
}

- (IBAction)toggleEnabledForResponseSwitch:(id)sender{
    
    UIActivityIndicatorView *ai = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:ai];
    [ai startAnimating];
    
    NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
    
    if (responseSwitch.on){
        [params setObject:@"1" forKey:@"response"];
    } else{
        [params setObject:@"0" forKey:@"response"];
    }
    
    [params setObject:[event objectForKey:@"eventid" ] forKey:@"eventID"];
    [params setObject:[event objectForKey:@"datetime"] forKey:@"datetime"];
    [params setObject:[[PFUser currentUser] objectForKey:@"fbID"] forKey:@"inviteeFB"];
    
    [PFCloud callFunctionInBackground:@"updateEventResponse" withParameters:params block:^(id object, NSError *error) {
        
        if (!error){
            
            NSLog(@"Response updated...");
            [ai stopAnimating];
            
            // NSLog([events objectAtIndex:0]);
        }
        
        
    }];

    
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
    return 1;

}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
#warning Incomplete method implementation.
    // Return the number of rows in the section.
    return [[event objectForKey:@"invites"] count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier];
    }
    
    /*
    
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0ul);
    dispatch_async(queue, ^{
        NSString *strForImg = [[NSString alloc] initWithFormat:@"https://graph.facebook.com/%@/picture?type=square",[[[event objectForKey:@"invites"] objectAtIndex:[indexPath row]] objectForKey:@"fbID"]];
        
        NSURL *url =[NSURL URLWithString:strForImg];
        UIImage *img = [UIImage imageWithData: [NSData dataWithContentsOfURL:url]];
        dispatch_sync(dispatch_get_main_queue(), ^{
            [cell.imageView setImage:img];
            
        });
    });
     
    */
    
    
    NSDateFormatter* dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"dd-MM HH:mm"];
    
    cell.textLabel.text = @"hoi";
    cell.textLabel.text = [[[event objectForKey:@"invites"] objectAtIndex:[indexPath row]] objectForKey:@"name"];
    //cell.detailTextLabel.text = [dateFormatter stringFromDate:[[eventList objectAtIndex:[indexPath row]] objectForKey:@"datetime"]];
    
    return cell;
}

#pragma mark - Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    //EventDetailViewController *detailViewController = [[EventDetailViewController alloc] initWithNibName:@"EventDetailViewController" bundle:nil];
    
    //detailViewController.event = [eventList objectAtIndex:[indexPath row]];
    
    //[self.navigationController pushViewController:detailViewController animated:YES];
    
}



@end

//
//  EventsTableViewController.m
//  Attendar
//
//  Created by Scott Brugmans on 03-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import <Parse/Parse.h>
#import "EventsTableViewController.h"
#import "EventDetailViewController.h"


@interface EventsTableViewController ()

@end

@implementation EventsTableViewController
@synthesize eventList;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        
        eventList = [[NSMutableArray alloc] init];
        
        
        [[self navigationItem] setTitle:@"Events"];
        
        self.title = @"Events";
        //self.tabBarItem.image = [UIImage imageNamed:@"cart.png"];


        
        PFUser *currentUser = [PFUser currentUser];
        
        if (!currentUser.email)
        {
            UIActivityIndicatorView *ai = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
            self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:ai];
            [ai startAnimating];
            
            NSLog(@"Asking cloud to fetch user data from Facebook");
            
            [PFCloud callFunctionInBackground:@"registerNewUser" withParameters:[NSDictionary new] block:^(id object, NSError *error) {
                if (!error)
                {
                    NSLog(@"Cloud fetched user data, now requesting refresh");
                    [[PFUser currentUser] refreshInBackgroundWithBlock:^(PFObject *object, NSError *error) {
                        if (!error) {
                            NSLog(@"Local user data refreshed.");
                            [ai stopAnimating];
                        }
                    }];
                    
                }
            }];
            
            
        }
        
        [self refreshData];
        
 
         
    }
    return self;
}

- (void)stopRefreshAnimation
{
    UIBarButtonItem *button = [[UIBarButtonItem alloc]
                               initWithBarButtonSystemItem:UIBarButtonSystemItemRefresh
                               target:self
                               action:@selector(refreshData)];
    self.navigationItem.rightBarButtonItem = button;
}

-(void)startRefreshAnimation
{
    UIActivityIndicatorView *ai = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:ai];
    [ai startAnimating];
}


- (void)refreshData
{
    [self startRefreshAnimation];

    NSLog(@"Retrieving... new events");
    
    
    NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
    [params setObject:[NSDate date] forKey:@"start"];
    [params setObject:@"14" forKey:@"forDays"];
    
    [PFCloud callFunctionInBackground:@"retrieveEvents" withParameters:params block:^(id object, NSError *error) {
        
        if (!error){
            
            NSLog(@"Event data recieved, parsing...");
            
            eventList = nil;
            eventList = [[NSMutableArray alloc] init];
            
            eventList = object;
            
            NSLog(@"%@\n", eventList);
            
            
            //for (id key in results) {
            
            //    [eventList addObject:[results objectForKey:key]];
            
            //}
            
            [self.tableView reloadData];
            [self stopRefreshAnimation];
            
            // NSLog([events objectAtIndex:0]);
        }
        
        
        
    }];
}

- (id)initWithStyle:(UITableViewStyle)style
{
    self = [super initWithStyle:style];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
 
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
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
    return [eventList count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:CellIdentifier];
    }
    
    // Configure the cell...
    
    NSDateFormatter* dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"dd-MM HH:mm"];
    
    cell.textLabel.text = [[eventList objectAtIndex:[indexPath row]] objectForKey:@"title"];
    cell.detailTextLabel.text = [dateFormatter stringFromDate:[[eventList objectAtIndex:[indexPath row]] objectForKey:@"datetime"]];
    
    return cell;
}

/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/

/*
// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
        [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    }   
    else if (editingStyle == UITableViewCellEditingStyleInsert) {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }   
}
*/

/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath
{
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/

#pragma mark - Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{

     EventDetailViewController *detailViewController = [[EventDetailViewController alloc] initWithNibName:@"EventDetailViewController" bundle:nil];
    
    detailViewController.event = [eventList objectAtIndex:[indexPath row]];
    
     [self.navigationController pushViewController:detailViewController animated:YES];
     
}

@end

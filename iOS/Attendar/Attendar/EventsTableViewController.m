//
//  EventsTableViewController.m
//  Attendar
//
//  Created by Scott Brugmans on 03-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import <Parse/Parse.h>
#import "EventsTableViewController.h"


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

        UIActivityIndicatorView *ai = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
        
        self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:ai];
        
        PFUser *currentUser = [PFUser currentUser];
        
        if (!currentUser.email)
        {
            [ai startAnimating];
            
            NSLog(@"Asking cloud to fetch user data from Facebook");
            
            [PFCloud callFunctionInBackground:@"pullFacebookData" withParameters:[NSDictionary new] block:^(id object, NSError *error) {
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
        
        NSLog(@"Pulling new events");
        
        [ai startAnimating];
        
        
        
        [PFCloud callFunctionInBackground:@"pullEvents" withParameters:[NSDictionary new] block:^(id object, NSError *error) {
            
            if (!error){
                
                NSLog(@"Event data recieved, parsing...");
                
                NSDictionary *results = [NSDictionary alloc];
                results = object;
                
                eventList = nil;
                eventList = [[NSMutableArray alloc] init];
                
                for (id key in results) {
                    
                    [eventList addObject:[results objectForKey:key]];
                    
                }
                
                [self.tableView reloadData];
                [ai stopAnimating];
                
               // NSLog([events objectAtIndex:0]);
            }
            
            
            
        }];
         
         
    
    
    
    }
    return self;
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
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier];
    }
    
    // Configure the cell...
    
    cell.textLabel.text = [[eventList objectAtIndex:[indexPath row]] objectForKey:@"title"];
    
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
    // Navigation logic may go here. Create and push another view controller.
    /*
     <#DetailViewController#> *detailViewController = [[<#DetailViewController#> alloc] initWithNibName:@"<#Nib name#>" bundle:nil];
     // ...
     // Pass the selected object to the new view controller.
     [self.navigationController pushViewController:detailViewController animated:YES];
     */
}

@end

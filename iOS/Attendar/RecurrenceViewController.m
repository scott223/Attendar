//
//  RecurrenceViewController.m
//  Attendar
//
//  Created by Scott Brugmans on 10-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import "RecurrenceViewController.h"

@interface RecurrenceViewController ()

@end

@implementation RecurrenceViewController

@synthesize lblRecurrenceTimes, recurrenceTimes, recurrenceType, thePicker, theTable, delegate;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        recurrenceTimes = [[NSNumber alloc] initWithInt:1];

    }
    return self;
}

- (IBAction)stepperValueChanged:(UIStepper *)sender
{
    recurrenceTimes = [NSNumber numberWithDouble:sender.value];
    [self updateLabel];
}

- (void)updateLabel
{
    NSString *unit = @"";
    
    if ([recurrenceType isEqualToString:@"Daily"]) {
        unit = @" day";
    } else if ([recurrenceType isEqualToString:@"Weekly"]) {
        unit = @" week";
    } else if ([recurrenceType isEqualToString:@"Monthly"]) {
        unit = @" month";
    }
    
    NSString *base = @"Repeat every";
    
    switch ([recurrenceTimes intValue]) {
        case 1:
            lblRecurrenceTimes.text = [base stringByAppendingString:unit];
            break;
        case 2:
            lblRecurrenceTimes.text = [[base stringByAppendingString:@" second"] stringByAppendingString:unit];
            break;
            
        case 3:
            lblRecurrenceTimes.text = [[base stringByAppendingString:@" third"] stringByAppendingString:unit];
            break;
            
        case 4:
            lblRecurrenceTimes.text = [[base stringByAppendingString:@" fourth"] stringByAppendingString:unit];
            break;
            
        case 5:
            lblRecurrenceTimes.text = [[base stringByAppendingString:@" fifth"] stringByAppendingString:unit];
            break;
            
        default:
            break;
    }
}

- (void)viewDidLoad
{
    [super viewDidLoad];
        [self updateLabel];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    if ([recurrenceType isEqualToString:@"Daily"]) {
        thePicker.hidden = FALSE;
        theTable.hidden = TRUE;
    } else {
        thePicker.hidden = TRUE;
        theTable.hidden = FALSE;
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

    return 1;
    
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 1;
}


- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    return nil;
    
}



- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:CellIdentifier];
    }
    
    
    cell.textLabel.text = @"test";
    
    
    
    return cell;
}

#pragma mark - Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    
 //
    
}



@end

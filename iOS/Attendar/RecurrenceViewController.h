//
//  RecurrenceViewController.h
//  Attendar
//
//  Created by Scott Brugmans on 10-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol RecurrenceDelegate;

@interface RecurrenceViewController : UIViewController <UITableViewDataSource, UITableViewDelegate>{
    id <RecurrenceDelegate> delegate;
    
}

@property (nonatomic, retain) IBOutlet UILabel *lblRecurrenceTimes;
@property (nonatomic, retain) IBOutlet UIStepper *stepperRecurrenceTimes;
@property (nonatomic, retain) IBOutlet UIDatePicker *thePicker;
@property (nonatomic, retain) IBOutlet UITableView *theTable;

@property (retain, nonatomic) id <RecurrenceDelegate> delegate;
@property (retain, nonatomic) NSNumber *recurrenceTimes;
@property (retain, nonatomic) NSString *recurrenceType;

- (IBAction)stepperValueChanged:(UIStepper *)sender;

@end

@protocol RecurrenceDelegate <NSObject>
// recurrence == nil on cancel
- (void)recurrenceViewController:(RecurrenceViewController *)RecurrenceViewController didRecurrence:(NSMutableDictionary *)recurrence;

@end

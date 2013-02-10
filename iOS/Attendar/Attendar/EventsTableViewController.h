//
//  EventsTableViewController.h
//  Attendar
//
//  Created by Scott Brugmans on 03-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AddEventViewController.h";

@interface EventsTableViewController : UITableViewController  <EventAddDelegate> {
    NSMutableArray *eventList;
}


@property (nonatomic, retain) NSMutableArray *eventList;

@end

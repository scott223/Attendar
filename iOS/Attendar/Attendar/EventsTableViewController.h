//
//  EventsTableViewController.h
//  Attendar
//
//  Created by Scott Brugmans on 03-02-13.
//  Copyright (c) 2013 Scott Brugmans. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface EventsTableViewController : UITableViewController {
    NSMutableArray *eventList;
}


@property (nonatomic, retain) NSMutableArray *eventList;

@end

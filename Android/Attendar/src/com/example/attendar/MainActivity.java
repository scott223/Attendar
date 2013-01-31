package com.example.attendar;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

import com.parse.Parse;
import com.parse.ParseObject;
import com.parse.PushService;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        Parse.initialize(this, "anWQYBQ68ZoMzuY1OO7245FXLcuwemmeP8fYfi75", "j9HrhQ1R6BQVYb4KHJPJh1QrpEuDfOhWN9cu206c");        
        
        ParseObject testObject = new ParseObject("TestObject");
        testObject.put("foo123", "bar");
        testObject.saveInBackground();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
    
}

package com.tradebid;

import com.facebook.react.ReactActivity;

import android.content.Intent;
import android.os.Bundle;
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TradeBid";
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.clear();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}

package b2b_backend;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Analytics {
    public static void main(String[] args) {
    	HashMap<String,Integer> pie = new HashMap<>();
        pie.put("USD",10000);
        pie.put("USD",21000);
        HashMap<String,HashMap<String,Integer>> bar = new HashMap<String,HashMap<String,Integer>>();
        ArrayList<HashMap> n = new ArrayList<>();
        n.add(pie);
        n.add(bar);
        Gson gson = new GsonBuilder().serializeNulls().create();
		String invoices = gson.toJson(n);
    }
}

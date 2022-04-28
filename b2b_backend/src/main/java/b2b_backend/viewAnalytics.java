package b2b_backend;

import java.util.ArrayList;
import java.util.HashMap;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@WebServlet("/viewAnalytics")
public class viewAnalytics extends HttpServlet{
	
	private static final long serialVersionUID = 1L;
	
	public viewAnalytics() {
		super(); //it will call its parent class which is HttpServlet
	}
	
	public String shortit(String name) {
		if(name.length()>9)
		return name.substring(0,6);
		else
			return name;
	}
	
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		
		PrintWriter out = res.getWriter();

	    try {
	    	
	    	String Cur = req.getParameter("Cur");
	    	String ClearDateFrom = req.getParameter("clr_date_from");
	    	String ClearDateto = req.getParameter("clr_date_to");
	    	String DueDateFrom = req.getParameter("due_date_from");
	    	String DueDateto = req.getParameter("due_date_to");
	    	String BaseLineClearDateFrom = req.getParameter("base_date_from");
	    	String BaseLineClearDateto= req.getParameter("base_date_to");
	    	ArrayList<Pie> pie = new ArrayList<>();
	    	ArrayList<BarChart> bar = new ArrayList<>();
	    	Connection con = GetConnection.connectToDb();
	    	Statement st = con.createStatement();
	    	System.out.print(Cur);
	    	
	    	if(Cur.equals("BOTH")) {
	        System.out.print("runned");
	    	String querey = "SELECT DISTINCT invoice_currency AS Dis FROM winter_internship";
	    	
	    	ResultSet rs = st.executeQuery(querey);
	    	
	    	while(rs.next()) {
	    		Pie p = new Pie();
	    		p.setName(rs.getString("Dis"));
	    		pie.add(p);
	    	}
	    	
	    	for(Pie p: pie) {
	    		querey = "SELECT COUNT(*) AS total FROM winter_internship WHERE invoice_currency LIKE '"+p.getName()+"' AND is_deleted = 0 AND clear_date BETWEEN '"+ClearDateFrom+"' AND '"+ClearDateto+"'"
	    					    				       + "AND due_in_date BETWEEN '"+DueDateFrom+"' AND '"+DueDateto+"' AND baseline_create_date BETWEEN '"+BaseLineClearDateFrom+"'"
	    					    				       		+ " AND '"+BaseLineClearDateto+"'";
	    		rs = st.executeQuery(querey);
		        while(rs.next()) {
		        	p.setCount(rs.getInt("total"));
		    	}
	    	}
	    
	    	String querey1 = "SELECT * FROM business ";
	    	ResultSet rs1 = st.executeQuery(querey1);
	    	while(rs1.next()) {
	    		BarChart b = new BarChart();
	    		b.setName(shortit(rs1.getString("business_name")));
	    		b.setId(rs1.getString("business_code"));
	    		bar.add(b);
	    	}
	    	
	    	for(BarChart b: bar) {
	    		String querey2 = "SELECT AVG(total_open_amount) AS total_open_amt FROM winter_internship WHERE business_code "
	    				       + "LIKE '"+b.getId()+"' AND is_deleted = 0 AND clear_date BETWEEN '"+ClearDateFrom+"' AND '"+ClearDateto+"' "
	    				       + "AND due_in_date BETWEEN '"+DueDateFrom+"' AND '"+DueDateto+"' AND baseline_create_date BETWEEN '"+BaseLineClearDateFrom+"'"
	    				       		+ " AND '"+BaseLineClearDateto+"'";
	    		rs1 = st.executeQuery(querey2);
	    		while(rs1.next()) {
	    		b.setTotal_open_amt(rs1.getInt("total_open_amt"));
	    		}
	    		
	    		querey2 = "SELECT COUNT(cust_number) AS total_cust FROM winter_internship WHERE business_code "
 				       + "LIKE '"+b.getId()+"' AND is_deleted = 0 AND clear_date BETWEEN '"+ClearDateFrom+"' AND '"+ClearDateto+"' "
 				       + "AND due_in_date BETWEEN '"+DueDateFrom+"' AND '"+DueDateto+"' AND baseline_create_date BETWEEN '"+BaseLineClearDateFrom+"'"
 				       		+ " AND '"+BaseLineClearDateto+"'";
 		           rs1 = st.executeQuery(querey2);
 		           while(rs1.next()) {
 		           b.setNo_customer(rs1.getInt("total_cust"));
 		 }
	    		
	    	}
	    	ArrayList<ArrayList> send = new ArrayList<>();
    		send.add(pie);
    		send.add(bar);
    		Gson gson = new GsonBuilder().serializeNulls().create();
    		res.setHeader("Access-Control-Allow-Origin", "*");
			String invoices = gson.toJson(send);
			System.out.print(invoices);
			out.print(invoices);
			res.setStatus(200);
			out.flush();
	    	
			}else {
				String querey1 = "SELECT * FROM business ";
		    	ResultSet rs1 = st.executeQuery(querey1);
		    	while(rs1.next()) {
		    		BarChart b = new BarChart();
		    		b.setName(shortit(rs1.getString("business_name")));
		    		b.setId(rs1.getString("business_code"));
		    		bar.add(b);
		    	}
		    	
		    	for(BarChart b: bar) {
		    		String querey2 = "SELECT AVG(total_open_amount) AS total_open_amt FROM winter_internship WHERE business_code "
		    				       + "LIKE '"+b.getId()+"' AND is_deleted = 0 AND clear_date BETWEEN'"+ClearDateFrom+"' AND  '"+ClearDateto+"' "
		    				       + "AND due_in_date BETWEEN '"+DueDateFrom+"' AND '"+DueDateto+"' AND baseline_create_date BETWEEN '"+BaseLineClearDateFrom+"'"
		    				       		+ " AND '"+BaseLineClearDateto+"' AND invoice_currency LIKE '"+Cur+"'";
		    		rs1 = st.executeQuery(querey2);
		    		while(rs1.next()) {
		    		b.setTotal_open_amt(rs1.getInt("total_open_amt"));
		    		}
		    		
		    		querey2 = "SELECT COUNT(cust_number) AS total_cust FROM winter_internship WHERE business_code "
	 				       + "LIKE '"+b.getId()+"' AND is_deleted = 0 AND clear_date BETWEEN '"+ClearDateFrom+"' AND '"+ClearDateto+"' "
	 				       + "AND due_in_date BETWEEN '"+DueDateFrom+"' AND '"+DueDateto+"' AND baseline_create_date BETWEEN '"+BaseLineClearDateFrom+"'"
	 				       		+ " AND '"+BaseLineClearDateto+"' AND invoice_currency LIKE '"+Cur+"'";
	 		           rs1 = st.executeQuery(querey2);
	 		           while(rs1.next()) {
	 		           b.setNo_customer(rs1.getInt("total_cust"));
	 		 }
		    		
		    	}
		    	ArrayList<ArrayList> send = new ArrayList<>();
	    		
	    		send.add(bar);
	    		Gson gson = new GsonBuilder().serializeNulls().create();
				String invoices = gson.toJson(send);
				res.setHeader("Access-Control-Allow-Origin", "*");
				
				out.print(invoices);
				res.setStatus(200);
				out.flush();
	    		
			}
	    	
	        }
		catch(Exception e) {
			e.printStackTrace();
		}
	    
	}
	
	
}

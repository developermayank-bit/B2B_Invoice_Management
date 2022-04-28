package b2b_backend;

import java.io.IOException;//deals with input/output exception
import javax.servlet.ServletException;// Construct a new servlet exception when needed and shows root cause
import javax.servlet.annotation.WebServlet;// used to servlet a component in web application
import javax.servlet.http.HttpServlet;// Provide an abstract class to be subclassed making suitable for websites
import javax.servlet.http.HttpServletRequest;//Recieves Objects from front end 
import javax.servlet.http.HttpServletResponse;//Provides modified objects to front-end 

import java.io.PrintWriter;//enables us to display pages in web browser
import java.sql.Connection;//enables us to connect with sq
import java.sql.ResultSet;//maintains a cursor pointing to a row of table
import java.sql.SQLException;//An exception tht proovide info of all error in database access 
import java.sql.Statement;//helps to create basics sql statement in java
import java.util.ArrayList;//

import com.google.gson.Gson;//Serialize java object to JSON and vice versa
import com.google.gson.GsonBuilder;//used to build json objects with various configure setting 

@WebServlet("/ProvideDataforPrediction")
public class ProvideDataforPrediction extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ProvideDataforPrediction() {
		super(); //it will call its parent class which is HttpServlet
	}
	
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		
		PrintWriter out = res.getWriter();
		
	    ArrayList<PreDictData> data = new ArrayList<PreDictData>();
	    String selected = req.getParameter("selected");
	    
	    try {
	    	
	    	for(String id:selected.split(",")){
	    		
	    	String querey = "SELECT * FROM winter_internship WHERE is_deleted = 0 AND doc_id = "+id;
	    	Connection con = GetConnection.connectToDb();
	    	Statement st = con.createStatement();
	    	ResultSet rs = st.executeQuery(querey);
	    	PreDictData pre = new PreDictData();
	    	
	    	while(rs.next()) {	
	    		pre.setDoc_id(rs.getString("doc_id"));
	    		pre.setBusiness_code(rs.getString("business_code"));
	    		pre.setBuisness_year(rs.getInt("buisness_year"));
	    		pre.setPosting_date(rs.getString("posting_date"));
	    		pre.setDue_in_date(rs.getString("due_in_date"));
	    		pre.setBaseline_create_date(rs.getString("baseline_create_date"));
	    		pre.setCust_payment_terms(rs.getString("cust_payment_terms"));
	    		pre.setTotal_open_amt(rs.getInt("total_open_amount"));
	    		pre.setInvoice_currency(rs.getString("invoice_currency"));
	    		pre.setClear_date(rs.getString("clear_date"));
	    		pre.setCust_number(rs.getInt("cust_number"));
	    	}
	    	
	    	querey = "SELECT * FROM customer WHERE cust_number = " + pre.getCust_number();
	    	rs = st.executeQuery(querey);
	    	
	    	while(rs.next()) {
	    		pre.setName_customer(rs.getString("name_customer"));
	    	}
	    	data.add(pre);
	    	}
	 
	    
	    	Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices = gson.toJson(data);
			System.out.println(invoices);
			res.setHeader("Access-Control-Allow-Origin", "*");
			out.print(invoices);
			res.setStatus(200);
			out.flush();
			
			
	    }catch(ClassNotFoundException e) {
	    	e.printStackTrace();
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	    
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
}

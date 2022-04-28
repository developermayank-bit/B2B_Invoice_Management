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

@WebServlet("/SendData")
public class Senddata extends HttpServlet{
	
	
	private static final long serialVersionUID = 1L;

	public Senddata() {
		super(); //it will call its parent class which is HttpServlet
	}
	
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		
		PrintWriter out = res.getWriter();
		
	    ArrayList<Invoice> data = new ArrayList<Invoice>();
	   
	    
	    String sort = req.getParameter("sort")==null?"sl_no":req.getParameter("sort");
	    String order = req.getParameter("wsort")==null?"ASC":req.getParameter("wsort");
	    try {
	    	
	    	
	    	String querey = "SELECT * FROM winter_internship WHERE is_deleted = 0 ORDER BY "+sort+" "+order;
	    	Connection con = GetConnection.connectToDb();
	    	Statement st = con.createStatement();
	    	ResultSet rs = st.executeQuery(querey);
	    	
	    	
	    	while(rs.next()) {
	    		Invoice  inv = new  Invoice();
	    		inv.setSl_no(rs.getInt("sl_no"));
			    inv.setBusiness_code(rs.getString("business_code"));
				inv.setCust_number(rs.getString("cust_number"));
				inv.setClear_date(rs.getString("clear_date"));
				inv.setBusiness_year(rs.getString("buisness_year"));
				inv.setDoc_id(rs.getString("doc_id"));
			    inv.setPosting_date(rs.getString("posting_date"));
			    inv.setDocument_create_date(rs.getString("document_create_date"));
				inv.setDue_in_date(rs.getString("due_in_date"));
				inv.setInvoice_currency(rs.getString("invoice_currency"));
				inv.setDocument_type(rs.getString("document_type"));				
				inv.setPosting_id(rs.getString("posting_id"));
				inv.setTotal_open_amount(rs.getString("total_open_amount"));
		    	inv.setBaseline_create_date(rs.getString("baseline_create_date"));
				inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
				inv.setInvoice_id(rs.getString("invoice_id"));
				inv.setIsOpen(rs.getString("isOpen"));
				inv.setAging_bucket(rs.getString("aging_bucket"));
				data.add(inv);
	    	}
	    
	    	Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices = gson.toJson(data);
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

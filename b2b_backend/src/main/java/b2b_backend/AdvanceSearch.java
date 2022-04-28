package b2b_backend;

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

@WebServlet("/AdvanceSearch")
public class AdvanceSearch extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AdvanceSearch() {
		super();
	}
	
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException{
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		
		PrintWriter out = res.getWriter();
		
	    ArrayList<Invoice> data = new ArrayList<Invoice>();
	    try {
	    	String querey = "SELECT * FROM winter_internship WHERE is_deleted = 0 ";
	    	querey = querey + (req.getParameter("doc_id").equals("")?"":"AND doc_id LIKE "+ req.getParameter("doc_id"))+" ";
	    	querey = querey + (req.getParameter("invoice_id").equals("")?"":"AND invoice_id LIKE "+ req.getParameter("invoice_id"))+" ";
	    	querey = querey + (req.getParameter("cust_number").equals("")?"":"AND cust_number LIKE "+ req.getParameter("cust_number"))+" ";
	    	querey = querey + (req.getParameter("business_year").equals("")?"":"AND buisness_year = "+ req.getParameter("business_year"))+" ";
	    	querey = querey + "ORDER BY sl_no ASC";
	    	System.out.println(querey);
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
	

}

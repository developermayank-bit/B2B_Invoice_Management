package b2b_backend;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/EditInvoice")
public class EditInvoice extends HttpServlet  {
	private static final long serialVersionUID = 1L;
	
	 public EditInvoice() {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	 protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
			
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			
			try {
				String id = req.getParameter("selected");
				String invoice_cur = req.getParameter("InvoiceCurrencey");
				String CustPayTerms = req.getParameter("CustomerPaymentTerms");
				Connection con = GetConnection.connectToDb();
				String querey = "UPDATE winter_internship SET invoice_currency = '"+invoice_cur+"',cust_payment_terms = '"+CustPayTerms+"' WHERE doc_id = "+id;
				
				PreparedStatement st = con.prepareStatement(querey);

               res.setHeader("Access-Control-Allow-Origin", "*");
				st.executeUpdate();
//				conn.commit();
				con.close();
			}
			catch (IOException e) {
				e.printStackTrace();
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
			catch (Exception e) {
				e.printStackTrace();
			}
		}
}

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


@WebServlet("/AddInvoice")
public class AddData extends HttpServlet  {
	
	private static final long serialVersionUID = 1L;
	
	 public AddData() {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	 protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
			
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			
			try {
				int count = 0;
				Connection con = GetConnection.connectToDb();
				String querey = "SELECT COUNT(*) AS TOTAL FROM winter_internship";
				Statement st1 = con.createStatement();
		    	ResultSet rs = st1.executeQuery(querey);
		    	
		    	while(rs.next()) {
		    		count=rs.getInt("TOTAL")+1;
		    	}
				
				String str = "INSERT INTO winter_internship (sl_no,business_code, cust_number, clear_date, buisness_year, doc_id, posting_date,document_create_date,"
						+ "document_create_date1, due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,"
						+ "cust_payment_terms,invoice_id,isOpen,aging_bucket,is_deleted) VALUES ("+count+",'"+req.getParameter("buisnessCode")+"',"+req.getParameter("CustomerNum")+",'"
						+  req.getParameter("ClearDate")+"',"+req.getParameter("BuisnessYear")+","+req.getParameter("DocID")+",'"+req.getParameter("PostingDate")+"','"+req.getParameter("DocumentCreateDate")+"','"
						+  req.getParameter("DocumentCreateDate")+"','"+req.getParameter("DueDate")+"','"+req.getParameter("InvoiceCur")
						+ "','"+req.getParameter("DocumentType")+"',"+req.getParameter("PostingID")+",NULL,"+req.getParameter("TotalOpenAmt")+",'"
						+  req.getParameter("BaseLineDate")+"','"+req.getParameter("CustomerPayTerms")+"',"+req.getParameter("invoiceID")+","
						+ "1,NULL,0 )";
				
				
				
				PreparedStatement st = con.prepareStatement(str);

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


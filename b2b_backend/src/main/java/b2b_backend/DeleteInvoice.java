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


@WebServlet("/DeleteInvoice")
public class DeleteInvoice extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
	 public DeleteInvoice() {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	 protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
			
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			
			try {
				String selected = req.getParameter("selected");

				Connection con = GetConnection.connectToDb();
				System.out.println(selected);
				for(String id:selected.split(",")) {
				String querey = "UPDATE winter_internship SET is_deleted = 1 WHERE doc_id = "+id;
				PreparedStatement st = con.prepareStatement(querey);
				st.executeUpdate();
				}
				res.setHeader("Access-Control-Allow-Origin", "*");

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

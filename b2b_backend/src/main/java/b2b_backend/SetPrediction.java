package b2b_backend;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/SetPrediction")
public class SetPrediction extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 public SetPrediction() {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	 protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
			
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			PrintWriter out = res.getWriter();
			try {
				String id = req.getParameter("selected");
				String aging_bucket = req.getParameter("prediction");
				Connection con = GetConnection.connectToDb();
				String querey = "UPDATE winter_internship SET aging_bucket = '"+aging_bucket+"' WHERE doc_id LIKE "+id;
				System.out.print("\n"+id+aging_bucket);
				PreparedStatement st = con.prepareStatement(querey);

              res.setHeader("Access-Control-Allow-Origin", "*");
				st.executeUpdate();
//				conn.commit();
				con.close();
				
				out.print(true);
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

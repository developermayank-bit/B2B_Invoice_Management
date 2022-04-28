package b2b_backend;

import java.io.PrintWriter;
import java.sql.*;


public class GetConnection {
    // JDBC module name and Mysql server URL
	static final String jdbc_driver = "com.mysql.cj.jdbc.Driver";
	static final String db_url = "jdbc:mysql://localhost:3306/grey_goose";
	
	// DataBase Credential
	static final String User = "root";
	static final String Pass  = "2210";
	
	
	public static Connection connectToDb() throws Exception{
    // Register JDBC Driver
		Class.forName(jdbc_driver);
		
		
    // Open a Connection
		Connection con = DriverManager.getConnection(db_url,User,Pass);
		
	// returning the Connection
		return con;
	}
	
	
}

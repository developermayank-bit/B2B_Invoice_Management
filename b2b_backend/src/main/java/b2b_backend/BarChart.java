package b2b_backend;

public class BarChart {
public String id;	
   public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
private String name;
   public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public int getNo_customer() {
	return no_customer;
}
public void setNo_customer(int no_customer) {
	this.no_customer = no_customer;
}
public int getTotal_open_amt() {
	return total_open_amt;
}
public void setTotal_open_amt(int total_open_amt) {
	this.total_open_amt = total_open_amt;
}
private int no_customer;
   private int total_open_amt;
}

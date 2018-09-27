import java.util.Scanner;

public class Evaluation {
	public static void main(String[] args) {
		String s = new String();
		Scanner in = new Scanner(System.in);
		while(in.hasNext())
			s = s.concat(in.nextLine());
		
		System.out.println(s.length());
		in.close();
	}
}
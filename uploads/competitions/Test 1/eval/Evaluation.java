import java.util.Scanner;
import java.io.File;
import java.io.*;

public class Evaluation {

	private static String readFile(String filename) {
		String s = new String();

		try {
			Scanner in = new Scanner(new File(filename));
			while (in.hasNext())
				s = s.concat(in.nextLine());

			in.close();
		} catch (FileNotFoundException e) {
			System.err.println("File not found: " + filename);
		}

		return s;
	}

	public static void main(String[] args) {
		System.out.println(readFile("output/file.txt").length());
	}
}
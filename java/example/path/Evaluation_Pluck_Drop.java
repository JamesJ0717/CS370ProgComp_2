import java.util.Scanner;
import java.io.File;
import java.io.*;
import java.lang.Integer;

public class Evaluation_Pluck_Drop {

	private static String readFile(String filename) {
		String s = new String();

		try {
			Scanner in = new Scanner(new File(filename));
			while(in.hasNext())
				s = s.concat(in.nextLine());
		
			in.close();
		} catch(FileNotFoundException e) {
			System.err.println("File not found: " + filename);
		}

		return s;
	}

	public static void main(String[] args) {
        String[] setup = readFile("generated/file.txt").split("_");
        int L = Integer.parseInt(setup[0]);
        int P = 0;
        boolean H = false;
        int S = 0;
        int[] piles = new int[L];
        int[] targets = new int[L];
        for(int i = 0; i < L; i++) {
            targets[i] = Integer.parseInt(setup[i+1]);
            piles[i] = Integer.parseInt(setup[i+1+L]);
        }
        
        String steps = readFile("output/file.txt").toLowerCase();
        for(int i = 0; i < steps.length(); i++) {
            char c = steps.charAt(i);
            if(c == 'l' && P > 0) {
                P--;
                S++;
            }
            
            if(c == 'r' && P < L - 1) {
                P++;
                S++;
            }
            
            if(c == 'p' && !H) {
                H = true;
                piles[P]--;
                S++;
            }
            
            if(c == 'd' && H) {
                H = false;
                piles[P]++;
                S++;
            }
        }
        
        for(int i = 0; i < L; i++) {
            int d = targets[i] - piles[i];
            if(d < 0)
                d *= -1;
            
            S += d * d * d;
        }

		System.out.println(S);
	}
}
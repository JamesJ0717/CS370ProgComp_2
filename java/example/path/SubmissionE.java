import java.io.File;
import java.util.Scanner;
import java.nio.file.Files;

public class SubmissionE {
  public static void main(String[] args) {
    System.out.println("deleting...");
    try {
      File file = new File("./temp.txt");
      boolean result = Files.deleteIfExists(file.toPath());
    } catch (Exception e) {
    }

    String s = new String();
    Scanner in = new Scanner(System.in);
    while (in.hasNext())
      s = s.concat(in.nextLine());

    in.close();
    while (in.hasNext())
      s = s.concat(in.nextLine());

    System.out.println("Running arbitrary Java code with " + s);
  }
}

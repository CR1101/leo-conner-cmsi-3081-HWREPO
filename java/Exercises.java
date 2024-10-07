import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.function.Predicate;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.FileNotFoundException;

public class Exercises {
    static Map<Integer, Long> change(long amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
        var counts = new HashMap<Integer, Long>();
        for (var denomination : List.of(25, 10, 5, 1)) {
            counts.put(denomination, amount / denomination);
            amount %= denomination;
        }
        return counts;
    }

    public static Optional<String> firstThenLowerCase(List<String> list, Predicate<String> predicate) {
        return list.stream().filter(predicate).map(String::toLowerCase).findFirst();
    }

    public record Say(String phrase) {
        public Say and(String nextWord) {
            return new Say(this.phrase + " " + nextWord);
        }
    }

    public static Say say(String word) {
        return new Say(word);
    }

    public static Say say() {
        return new Say("");
    }
    public static long meaningfulLineCount(String filename) throws IOException, FileNotFoundException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            return reader.lines().filter(line -> !line.trim().isEmpty() && !line.trim().startsWith("#"))
            .count();
        }
    }


}

record Quaternion(double a, double b, double c, double d) {
    
    public List<Double> coefficients() {
        return List.of(a, b, c, d);
    }
    
    public static final Quaternion ZERO = new Quaternion(0, 0, 0, 0);
    public static final Quaternion I = new Quaternion(0, 1, 0, 0);
    public static final Quaternion J = new Quaternion(0, 0, 1, 0);
    public static final Quaternion K = new Quaternion(0, 0, 0, 1); 

    public Quaternion {
        if (Double.isNaN(a)||Double.isNaN(b)||Double.isNaN(c)||Double.isNaN(d)) {
            throw new IllegalArgumentException("Coefficients cannot be NaN");
        }
        
    }
    public Quaternion plus(Quaternion other) {
        return new Quaternion(
            this.a + other.a,
            this.b + other.b,
            this.c + other.c,
            this.d + other.d
        );
    }
    public Quaternion conjugate() {
        return new Quaternion(this.a, -this.b, -this.c, -this.d);
    }

    public Quaternion times(Quaternion other) {
        double newA = this.a * other.a - this.b * other.b - this.c * other.c - this.d * other.d;
        double newB = this.a * other.b + this.b * other.a + this.c * other.d - this.d * other.c;
        double newC = this.a * other.c - this.b * other.d + this.c * other.a + this.d * other.b;
        double newD = this.a * other.d + this.b * other.c - this.c * other.b + this.d * other.a;
        return new Quaternion(newA, newB, newC, newD);
    }
    @Override public String toString() {
        if (this.a == 0 && this.b == 0 && this.c == 0 && this.d == 0) {
            return "0";
        }

        String aTemplate = this.a == 0 ? "" : String.valueOf(this.a);
        String bTemplate = this.b == 0 ? "" : (this.b < 0 ? "-" : (this.a != 0 ? "+" : "")) + 
                          ((Math.abs(this.b) == 1) ? "" : Math.abs(this.b)) + "i";
        String cTemplate = this.c == 0 ? "" : (this.c < 0 ? "-" : (this.a != 0 || this.b != 0 ? "+" : "")) + 
                          ((Math.abs(this.c) == 1) ? "" : Math.abs(this.c)) + "j";
        String dTemplate = this.d == 0 ? "" : (this.d < 0 ? "-" : (this.a != 0 || this.b != 0 || this.c != 0 ? "+" : "")) + 
                          ((Math.abs(this.d) == 1) ? "" : Math.abs(this.d)) + "k";

        return aTemplate + bTemplate + cTemplate + dTemplate;
    } 
    }




// Write your BinarySearchTree sealed interface and its implementations here

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


// Write your Quaternion record class here

// Write your BinarySearchTree sealed interface and its implementations here

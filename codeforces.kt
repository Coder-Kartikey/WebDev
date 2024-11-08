fun main() {
    val t = readLine()!!.toInt()
    repeat(t) {
        val n = readLine()!!.toInt()
        val d = readLine()!!.split(" ").map { it.toInt() }

        val maxD = d.subList(0, n - 1).maxOrNull()!!
        val lastD = d[n - 1]

        if (maxD < lastD) {
            println(maxD)
        } else {
            println("Ambiguous")
        }
    }
}

<template>
  <div id="home">
    <h1 id="welcome">Welcome to OPC!</h1>
    <p><i>If you&apos;re not taking part in online programming competitions via OPC, then you really ought to.</i> - Edsger W. Dijkstra, 1973</p>
    <br><br>

    <h2>
      For Hosts (how to create a competition):
    </h2>
    <p align="left">
      <ol>
      <li>Log in (or register) as a host and go to your dashboard.</li>
      <li>Click on <i>Create New Competition</i>. You will be prompted to enter the competition's name and a prompt, as well as its start and end dates.</li>
      <li>After posting the competition, go to <i>Update Competitions</i>, and select the newly created competition. You will be prompted to upload two files. <br>
      These must be either Python or Java code.
      <ol type="A">
      <li>The <i>Gen</i> file is executed before a competitor's code runs.
        This file should generate a problem description (whatever that may entail in the context of your competition), which it prints to standard output.</li>
      <li>The <i>Eval</i> file should produce a score for the competitor's code's output, and print the score to standard output. <br>
      Three relevant files are provided for score generation: <br>
      <ol type="i">
      <li>generated/file.txt is the specification created by the Gen file.</li>
      <li>output/file.txt is the solution created by the competitor's code.</li>
      <li>output/stats.txt is a file containing two numbers: the first is how many cpu-seconds were used by the competitor's code, and the second is how much memory was used while running it.</li>
      </ol></li>
      </ol></li>
      </ol>
    </p>


    <h2>
      For Competitors (how to join and compete):
    </h2>
    <p align="left">
      <ol>
      <li>Log in (or register) as a non-host and go to your dashboard.</li>
      <li>Click on <i>View Competitions</i>. You will be presented with a list of competitions that you can enter.</li>
      <li>Select a competition, and upload your submission file (which must be either Python or Java code). Your code should solve the competition problem which is fed in through standard input.</li>
      <li>You will recieve the results of your submission as soon as they are available. In the meantime, feel free to browse other competitions.</li>
      </ol>
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#home {
    text-align: center;
}
p {
    padding: 10px;
}
</style>

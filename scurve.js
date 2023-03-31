<!DOCTYPE html>
<html>
  <head>
    <title> Kurva S</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
    <canvas id="myChart"></canvas>
    <div style="text-align:center; margin-top: 20px;">
      <label for="update_progress">Tambahkan Nilai Progress Minggu Ini:</label>
      <input type="number" name="nilai" id="nilai">
      <input type="datetime-local" id="date">
      <button onclick="addData()">Tambahkan</button>
    </div>
    <script>
      var ctx = document.getElementById("myChart").getContext("2d");
      var xValues = Array.from(Array(101).keys());

      var startDate = new Date(2023, 0, 1); // January 1st, 2023
      var endDate = new Date(2023, 11, 31); // December 31st, 2023
      var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
      var yValues = [];
      for (var m = 0; m < monthNames.length; m++) {
        for (var w = 1; w <= 4; w++) {
          yValues.push(monthNames[m] + " w" + w);
        }
      }

      var data = {
        labels: yValues,
        datasets: [
          {
            label: "S-Curve",
            data: xValues.map(function (x) {
              return 1 / (1 + Math.exp(-0.1 * (x - 50)));
            }),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

      var options = {
        scales: {
          x: {
            title: {
              display: true,
              text: "Y-Axis",
            },
            ticks: {
              stepSize: 10,
              max: 100,
              min: 0,
            },
          },
          y: {
            title: {
              display: true,
              text: "Month",
            },
          },
        },
      };

      var myChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options,
      });

      function addData() {
        var nilai = document.getElementById("nilai").value;
        var date = document.getElementById("date").value;
        var newData = {
          x: Math.ceil(nilai / 100 * 101),
          y: dateToLabel(date)
        };
        myChart.data.datasets[0].data.push(newData);
        myChart.update();
      }

      function dateToLabel(dateString) {
        var date = new Date(dateString);
        var month = monthNames[date.getMonth()];
        var week = Math.ceil(date.getDate() / 7);
        return month + " w" + week;
      }

    </script>
</body>
</html>

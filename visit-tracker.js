// Counts a visit to the donation page. Shared counter lives at abacus.jasoncameron.dev;
// the same NAMESPACE/KEY pair is read by visit-counter.html.
(function () {
  var NAMESPACE = "resala-auc-donation";
  var KEY = "visits";
  var FLAG = "resala_counted";

  // One count per browser session, so refreshing doesn't inflate the number.
  try {
    if (sessionStorage.getItem(FLAG)) return;
    sessionStorage.setItem(FLAG, "1");
  } catch (e) { /* storage blocked: count anyway */ }

  fetch("https://abacus.jasoncameron.dev/hit/" + NAMESPACE + "/" + KEY, { keepalive: true })
    .catch(function () { /* counting must never break the donation page */ });
})();

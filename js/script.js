const { jsPDF } = window.jspdf;

function downloadPDF() {
    const doc = new jsPDF({
                           orientation: 'p',
                           unit: 'mm',
                           format: 'a4',
                           putOnlyUsedFonts:true
                          });
    doc.setFont('Helvetica');
    moment.locale("de-DE");
    var docWidth = doc.internal.pageSize.getWidth();

    // Form inputs
    fname = document.getElementById('fname').value;
    lname = document.getElementById('lname').value;
    street = document.getElementById('street').value;
    zipCity = document.getElementById('zipCity').value;
    bday = document.getElementById('bday').value;
    smonth = document.getElementById('smonth').value;
    emonth = document.getElementById('emonth').value;

    // Logo
    var img = new Image();
    img.src = 'img/bioinf_fs_logo.png';
    doc.addImage(img, "PNG", docWidth-45, 10, 35, 35);

    // Adress field
    doc.setFontSize(6);
    doc.text("Fachschaft Bioinformatik · Robert-Mayer-Straße 11-15 · 60325 Frankfurt am Main", 25, 39.7, {maxWidth: 85});

    doc.setFontSize(11);
    doc.text([fname + " " + lname,
              street,
              zipCity],
             25, 44.7, {maxWidth: 85});

    // Info block
    doc.setFontSize(11);
    doc.text(moment().format("L"),
             docWidth-40, 72);


    // Text
    doc.setFontSize(11);
    doc.text(["Sehr geehrte Damen und Herren",
              "",
              "hiermit bestätigen wir, dass " + fname + " " + lname + ", geb. am " + moment(bday).format("L") + ", sich von " + moment(smonth).format("MMMM YYYY") + " bis " + moment(emonth).format("MMMM YYYY") + " ehrenamtlich in der Fachschaft des Studiengangs Bioinformatik an der Goethe-Universität Frankfurt am Main engagiert hat.",
              "",
              "Zielsetzung der Fachschaft Bioinformatik ist es, die Vernetzung sowohl unter Studierenden als auch zwischen Studierenden und Dozierenden zu fördern und den Studiengang kontinuierlich inhaltlich sowie auch strukturell zu verbessern."],
            25, 87, {maxWidth: docWidth-45});
    
    doc.save("bescheinigung_fachschaft_bioinformatik.pdf");




}
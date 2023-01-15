const { jsPDF } = window.jspdf;

document.getElementById('emonth').value = moment().format("YYYY-MM-DD");

document.getElementById('active').onchange = function() {
  document.getElementById('emonth').disabled = this.checked;
  document.getElementById('emonth').value = moment().format("YYYY-MM-DD");
};

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
    pronoun = document.getElementById('pronoun').value;
    fname = document.getElementById('fname').value;
    lname = document.getElementById('lname').value;
    street = document.getElementById('street').value;
    zipCity = document.getElementById('zipCity').value;
    bday = document.getElementById('bday').value;
    smonth = document.getElementById('smonth').value;
    active = document.getElementById('active').checked
    emonth = document.getElementById('emonth').value;
    customText = document.getElementById('customText').value;
    signature = document.getElementById('signature').value;

    // Input-based phrases
    introduction = `hiermit bestätigen wir, dass ${fname} ${lname}, geb. am ${moment(bday).format("L")}, sich `
    conclusion = `Wir danken ${fname} für ${pronoun=="sie" ? 'ihr' : 'sein'} Engagement und `
    if (active) {
        introduction += `seit ${moment(smonth).format("MMMM YYYY")} ehrenamtlich in der Fachschaft des Studiengangs Bioinformatik an der Goethe-Universität Frankfurt am Main engagiert.`;
        conclusion += `freuen uns auf die weitere Zusammenarbeit!`;
    }
    else {
        introduction += `von ${moment(smonth).format("MMMM YYYY")} bis ${moment(emonth).format("MMMM YYYY")} ehrenamtlich in der Fachschaft des Studiengangs Bioinformatik an der Goethe-Universität Frankfurt am Main engagiert hat.`;
        conclusion += `wünschen ${pronoun=="sie" ? 'ihr' : 'ihm'} für ${pronoun=="sie" ? 'ihre' : 'seine'} Zukunft auch weiterhin alles Gute!`;
    }


    // Logo
    var img = new Image();
    img.src = 'img/bioinf_fs_logo.png';
    doc.addImage(img, "PNG", docWidth-45, 15, 30, 30);

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

    // Folding marks
    doc.setLineWidth(0.1);
    doc.line(5, 87, 10, 87);
    doc.line(5, 189, 10, 189);

    // Title
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text("Bescheinigung über ein ehrenamtliches Engagement", 25, 100);

    // Text
    doc.setFont('Helvetica', 'normal');
    doc.text(["Sehr geehrte Damen und Herren,",
              "",
              introduction,
              "",
              "Die Fachschaft Bioinformatik ist eine Interessensgemeinschaft und Organisation der studentischen Selbstverwaltung, die sich speziell an Studierende der Bioinformatik richtet. Zielsetzung der Fachschaft Bioinformatik ist es, die Vernetzung sowohl unter Studierenden als auch zwischen Studierenden und Dozierenden zu fördern und den Studiengang kontinuierlich inhaltlich sowie auch strukturell zu verbessern. Hierzu organisieren studentische Mitglieder Veranstaltungen wie einen Orientierungstag für neue Studierende, Stammtische sowie weitere Events. Die Fachschaft stellt außerdem einen Discord-Server zur studiengangsinternen Kommunikation bereit und dient als erster Ansprechpartner für Studierende. Hochschulpolitisch engagieren sich Mitglieder in universitären Gremien. Die Fachschaft geht weiterhin aktiv in den Austausch mit Dozierenden, um die Interessen der Studierenden zu vertreten.",
              "",
              customText,
              "",
              conclusion,
              "",
              "Mit freundlichen Grüßen",
              signature],
            25, 108.92, {maxWidth: docWidth-45});
    
    doc.save("bescheinigung_fachschaft_bioinformatik.pdf");
}
const toolData=[
{n:'Merge PDF',d:'Combine multiple PDF files into one.',c:'organize',i:'▤',fn:'merge'},
{n:'Split PDF',d:'Separate a PDF into individual pages or ranges.',c:'organize',i:'↗',fn:'split'},
{n:'Extract pages',d:'Save selected pages into a new PDF.',c:'organize',i:'▧',fn:'extract'},
{n:'Reorder pages',d:'Arrange every page in a custom sequence.',c:'organize',i:'↕',fn:'reorder'},
{n:'Remove pages',d:'Delete selected pages from your document.',c:'organize',i:'⌫',fn:'remove'},
{n:'Compress PDF',d:'Reduce PDF file size with adjustable quality.',c:'organize',i:'⇩',fn:'compress'},
{n:'Annotate PDF',d:'Add text, highlights and freehand notes to PDF pages.',c:'edit',i:'✎',fn:'annotate'},
{n:'JPG to PDF',d:'Turn images into a single PDF document.',c:'convert',i:'▣',fn:'imgpdf'},
{n:'PDF to images',d:'Render pages as PNG images for download.',c:'convert',i:'▧',fn:'pdfimg'},
{n:'Rotate pages',d:'Rotate pages in your PDF file.',c:'edit',i:'⟳',fn:'rotate'},
{n:'Add watermark',d:'Stamp text across every page.',c:'edit',i:'✦',fn:'watermark'},
{n:'Page numbers',d:'Add page numbers to a document.',c:'edit',i:'№',fn:'pagenum'},
{n:'Extract text',d:'Read and export text from your PDF.',c:'advanced',i:'≡',fn:'text'},
{n:'OCR scanned PDF',d:'Recognize text in scanned pages locally in your browser.',c:'advanced',i:'⌕',fn:'ocr'},
{n:'Protect PDF',d:'Encrypt a PDF with a password.',c:'security',i:'◈',fn:'protect'},
{n:'Unlock PDF',d:'Open PDFs you are authorized to access.',c:'security',i:'♢',fn:'unlock'},
{n:'PDF metadata',d:'View or update document title and author.',c:'advanced',i:'ℹ',fn:'meta'},
{n:'PDF preview',d:'Preview pages and check page count.',c:'advanced',i:'◉',fn:'preview'},
{n:'Crop PDF',d:'Trim page margins (basic crop workflow).',c:'edit',i:'⌗',fn:'crop'},
{n:'Compare PDFs',d:'Compare files side by side (preview workflow).',c:'advanced',i:'⇄',fn:'compare'},
{n:'PDF to Word',d:'Export text to editable DOCX (basic text export).',c:'convert',i:'W',fn:'word'},
{n:'PDF to CSV',d:'Export extracted text as CSV lines.',c:'convert',i:'▦',fn:'csv'},
{n:'Flatten PDF',d:'Flatten document form layers by rendering.',c:'advanced',i:'▱',fn:'flatten'}
];
const grid=document.getElementById('toolsGrid');let activeCat='all';
function renderTools(){let q=document.getElementById('searchTools').value.toLowerCase();grid.innerHTML=toolData.filter(t=>(activeCat==='all'||t.c===activeCat)&&(!q||t.n.toLowerCase().includes(q)||t.d.toLowerCase().includes(q))).map(t=>`<article class="tool-card" data-fn="${t.fn}"><span class="tool-arrow">↗</span><div class="tool-icon">${t.i}</div><h3>${t.n}</h3><p>${t.d}</p></article>`).join('');grid.querySelectorAll('.tool-card').forEach(el=>el.onclick=()=>openTool(el.dataset.fn));}
renderTools();document.getElementById('searchTools').addEventListener('input',renderTools);document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeCat=b.dataset.cat;renderTools()});
document.getElementById('themeToggle').onclick=()=>document.body.classList.toggle('light');document.getElementById('year').textContent=new Date().getFullYear();
const modal=document.getElementById('modal');function showAccount(title){document.getElementById('modalTitle').textContent=title;modal.classList.add('show')}document.getElementById('loginBtn').onclick=()=>showAccount('Log in to PDFWay');document.getElementById('signupBtn').onclick=()=>showAccount('Create your PDFWay account');document.getElementById('menuBtn').onclick=()=>showAccount('Welcome to PDFWay');document.getElementById('closeModal').onclick=()=>modal.classList.remove('show');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};document.getElementById('accountForm').onsubmit=e=>{e.preventDefault();alert('Authentication is not connected yet. Configure Supabase Auth to enable OTP.');};document.getElementById('googleBtn').onclick=()=>alert('Google OAuth setup is needed before sign-in can work.');
const picker=document.getElementById('filePicker');let selected=[];document.getElementById('uploadHero').onclick=()=>{picker.accept='.pdf';picker.multiple=false;picker.onchange=()=>{selected=[...picker.files];openTool('preview',selected)};picker.click()};
const toolBack=document.getElementById('toolModal'),toolContent=document.getElementById('toolContent');document.getElementById('toolClose').onclick=()=>toolBack.classList.remove('show');toolBack.onclick=e=>{if(e.target===toolBack)toolBack.classList.remove('show')};
function openTool(fn,files=[]){selected=files;const titles={merge:'Merge PDFs',split:'Split PDF',extract:'Extract pages',reorder:'Reorder pages',remove:'Remove pages',compress:'Compress PDF',imgpdf:'Images to PDF',pdfimg:'PDF to images',rotate:'Rotate pages',watermark:'Add watermark',pagenum:'Page numbers',text:'Extract text',ocr:'OCR scanned PDF',protect:'Password protect PDF',unlock:'Unlock PDF',meta:'PDF metadata',preview:'PDF preview',crop:'Crop PDF',compare:'Compare PDFs',word:'PDF to Word',csv:'PDF to CSV',flatten:'Flatten PDF',annotate:'Annotate PDF'};toolContent.innerHTML=`<h3>${titles[fn]||'PDF tool'}</h3><p>Select files below. Local processing is used for supported operations.</p><div class="drop-zone" id="dropZone">Drop files here or <button class="btn" id="chooseFiles">Browse files</button><div class="file-list" id="fileList">No files selected</div></div><div id="toolControls"></div><div class="actions"><button class="btn primary" id="runTool">Run tool</button><button class="btn glass" id="clearFiles">Clear</button></div><div class="tool-result" id="result"></div>`;toolBack.classList.add('show');const dz=document.getElementById('dropZone');document.getElementById('chooseFiles').onclick=()=>{picker.accept=fn==='imgpdf'?'image/*':'.pdf';picker.multiple=['merge','imgpdf','compare'].includes(fn);picker.click()};picker.onchange=()=>{selected=[...picker.files];updateFileList()};dz.ondragover=e=>{e.preventDefault();dz.classList.add('drag')};dz.ondragleave=()=>dz.classList.remove('drag');dz.ondrop=e=>{e.preventDefault();dz.classList.remove('drag');selected=[...e.dataTransfer.files];updateFileList()};function updateFileList(){document.getElementById('fileList').textContent=selected.map(f=>f.name).join(' • ')||'No files selected';}
const controls=document.getElementById('toolControls');if(['split','extract','remove'].includes(fn))controls.innerHTML='<label>Page numbers/range (e.g. 1,3-5)</label><input id="pageRange" placeholder="1, 3-5">';if(fn==='ocr')controls.innerHTML='<label>OCR language</label><select id="ocrLang"><option value="eng">English</option><option value="hin">Hindi</option><option value="eng+hin">English + Hindi</option></select><label>Render quality</label><select id="ocrScale"><option value="1.5">Standard</option><option value="2">High</option></select><p>Scanned pages are processed in your browser. First use may download language data from the OCR provider.</p>'; if(fn==='meta')controls.innerHTML='<label>Document title</label><input id="metaTitle" placeholder="Document title"><label>Author</label><input id="metaAuthor" placeholder="Author name"><label>Subject</label><input id="metaSubject" placeholder="Document subject"><label>Keywords (comma separated)</label><input id="metaKeywords" placeholder="reports, study, notes"><p>Leave a field blank to keep its existing value. Metadata is updated locally in your browser.</p>'; if(fn==='reorder')controls.innerHTML='<label>New page order (include every page exactly once)</label><input id="pageOrder" placeholder="3,1,2,4-6"><p>Example: 3,1,2 moves page 3 first, then pages 1 and 2. Use ranges for longer documents.</p>'; if(fn==='compress')controls.innerHTML='<label>Compression method</label><select id="quality"><option value="lossless">Lossless optimize (keeps selectable text)</option><option value="balanced">Balanced visual compression (pages become images)</option><option value="small">Smaller visual export (lower image quality)</option></select><p>Lossless optimization preserves page content and may reduce file size modestly. Visual compression can reduce image-heavy PDFs, but removes selectable text and may not always make every file smaller.</p>';if(['rotate','watermark','pagenum'].includes(fn))controls.innerHTML=fn==='rotate'?'<label>Rotation</label><select id="rotation"><option value="90">90°</option><option value="180">180°</option><option value="270">270°</option></select>':fn==='watermark'?'<label>Watermark text</label><input id="stamp" value="PDFWay" maxlength="80"><label>Watermark style</label><select id="watermarkStyle"><option value="diagonal">Diagonal center</option><option value="center">Centered</option><option value="header">Top header</option><option value="footer">Bottom footer</option><option value="tile">Repeated pattern</option></select><label>Text color</label><select id="watermarkColor"><option value="gray">Soft gray</option><option value="blue">Blue</option><option value="red">Red</option><option value="black">Black</option><option value="green">Green</option></select><label>Opacity</label><input id="watermarkOpacity" type="range" min="0.1" max="0.8" step="0.05" value="0.3"><label>Text size</label><input id="watermarkSize" type="range" min="12" max="60" step="2" value="30"><p>Choose where and how your watermark appears on every page.</p>':'<label>Numbering prefix</label><input id="prefix" value="Page ">';
if(fn==='watermark'){controls.insertAdjacentHTML('beforeend','<section class="watermark-preview-wrap"><p><strong>Live preview</strong> <span class="muted">(approximate)</span></p><div id="watermarkPreview" style="position:relative;overflow:hidden;background:#fff;color:#263247;border:1px solid #d7dce5;border-radius:10px;width:min(100%,340px);height:230px;margin:8px auto 14px;box-shadow:0 5px 18px #00000012"><div style="padding:22px 20px;font:12px/1.7 Arial,sans-serif"><div style="font-weight:700;font-size:16px;margin-bottom:10px">Sample document</div><div style="height:6px;background:#e9edf3;border-radius:4px;width:85%;margin:8px 0"></div><div style="height:6px;background:#e9edf3;border-radius:4px;width:95%;margin:8px 0"></div><div style="height:6px;background:#e9edf3;border-radius:4px;width:72%;margin:8px 0"></div><div style="height:6px;background:#e9edf3;border-radius:4px;width:90%;margin:8px 0"></div><div style="height:6px;background:#e9edf3;border-radius:4px;width:60%;margin:8px 0"></div></div><div id="watermarkPreviewText" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;font-family:Arial,sans-serif;font-weight:700;pointer-events:none">PDFWay</div></div><small class="muted">Preview uses a sample page; the downloaded PDF applies the selected settings to every page.</small></section>');const preview=document.getElementById('watermarkPreview'),sample=document.getElementById('watermarkPreviewText');function updateWatermarkPreview(){const label=document.getElementById('stamp').value.trim()||'PDFWay',style=document.getElementById('watermarkStyle').value,colorMap={gray:'#7b8190',blue:'#1f57d1',red:'#c72832',black:'#15171b',green:'#208052'},color=colorMap[document.getElementById('watermarkColor').value]||colorMap.gray,opacity=Number(document.getElementById('watermarkOpacity').value),size=Number(document.getElementById('watermarkSize').value);sample.textContent=label;sample.style.color=color;sample.style.opacity=opacity;sample.style.fontSize=Math.max(10,size*.72)+'px';sample.style.left='50%';sample.style.top=style==='header'?'24px':style==='footer'?'auto':'50%';sample.style.bottom=style==='footer'?'16px':'auto';sample.style.transform=style==='diagonal'?'translate(-50%,-50%) rotate(-35deg)':'translate(-50%,-50%)';sample.style.whiteSpace='nowrap';if(style==='tile'){sample.style.left='-10%';sample.style.top='42%';sample.style.transform='rotate(-30deg)';sample.style.whiteSpace='normal';sample.style.width='120%';sample.style.textAlign='center';sample.style.lineHeight='3.4';sample.textContent=Array(8).fill(label).join('   ');}else{sample.style.width='auto';sample.style.textAlign='left';sample.style.lineHeight='normal';}}['stamp','watermarkStyle','watermarkColor','watermarkOpacity','watermarkSize'].forEach(id=>{const el=document.getElementById(id);el.addEventListener('input',updateWatermarkPreview);el.addEventListener('change',updateWatermarkPreview)});updateWatermarkPreview();}document.getElementById('clearFiles').onclick=()=>{selected=[];picker.value='';updateFileList();document.getElementById('result').textContent=''};document.getElementById('runTool').onclick=()=>executeTool(fn);updateFileList();}
async function executeTool(fn){const out=document.getElementById('result');if(!selected.length){out.textContent='Please select a file first.';return}out.textContent='Processing…';try{const {PDFDocument,StandardFonts,rgb,degrees}=PDFLib;const download=(blob,name)=>{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),3000)};const savePdf=async(doc,name)=>download(new Blob([await doc.save()],{type:'application/pdf'}),name);const load=async f=>PDFDocument.load(await f.arrayBuffer());const range=(s,max)=>{let set=new Set();(s||'').split(',').forEach(part=>{let [a,b]=part.trim().split('-').map(Number);if(!a)return;b=b||a;for(let i=a;i<=b&&i<=max;i++)if(i>=1)set.add(i-1)});return [...set]};
const parsePageOrder=(value,total)=>{const tokens=(value||'').split(',').map(x=>x.trim());if(!tokens.length||tokens.some(x=>!x))throw Error('Enter a complete page order, for example 3,1,2,4-6.');const order=[];for(const token of tokens){if(!/^\d+(?:-\d+)?$/.test(token))throw Error('Use page numbers and ranges separated by commas.');const parts=token.split('-').map(Number);const start=parts[0],end=parts[1]??start;if(start<1||end<1||start>total||end>total||end<start)throw Error(`Page range ${token} is outside 1-${total}.`);for(let n=start;n<=end;n++){if(order.includes(n))throw Error(`Page ${n} appears more than once.`);order.push(n);}}if(order.length!==total)throw Error(`Include every page exactly once (${total} pages required).`);return order.map(n=>n-1);};let f=selected[0],doc;
if(fn==='annotate'){await launchAnnotationEditor(f,out);return;}
if(fn==='merge'){doc=await PDFDocument.create();for(const file of selected){const src=await load(file);const pages=await doc.copyPages(src,src.getPageIndices());pages.forEach(p=>doc.addPage(p))}await savePdf(doc,'merged.pdf');}
else if(['split','extract','remove'].includes(fn)){doc=await load(f);let inds=range(document.getElementById('pageRange').value,doc.getPageCount());if(!inds.length)throw Error('Enter valid page numbers/ranges.');if(fn==='split'){for(const index of inds){const one=await PDFDocument.create();const pages=await one.copyPages(doc,[index]);pages.forEach(p=>one.addPage(p));await savePdf(one,`split-page-${index+1}.pdf`);}out.textContent=`Started ${inds.length} separate page download(s).`;return;}let output=await PDFDocument.create();if(fn==='remove')inds=doc.getPageIndices().filter(i=>!inds.includes(i));const pages=await output.copyPages(doc,inds);pages.forEach(p=>output.addPage(p));await savePdf(output,fn==='remove'?'pages-removed.pdf':'extracted-pages.pdf');}
else if(fn==='reorder'){doc=await load(f);const order=parsePageOrder(document.getElementById('pageOrder').value,doc.getPageCount());const output=await PDFDocument.create();const pages=await output.copyPages(doc,order);pages.forEach(p=>output.addPage(p));await savePdf(output,'reordered.pdf');}
else if(fn==='rotate'){doc=await load(f);const angle=Number(document.getElementById('rotation').value);doc.getPages().forEach(p=>p.setRotation(degrees((p.getRotation().angle+angle)%360)));await savePdf(doc,'rotated.pdf');}
else if(fn==='watermark'||fn==='pagenum'){doc=await load(f);const font=await doc.embedFont(StandardFonts.Helvetica);if(fn==='watermark'){const label=document.getElementById('stamp').value.trim()||'PDFWay',style=document.getElementById('watermarkStyle').value,opacity=Number(document.getElementById('watermarkOpacity').value),size=Number(document.getElementById('watermarkSize').value),palette={gray:rgb(.48,.50,.56),blue:rgb(.12,.34,.82),red:rgb(.78,.16,.18),black:rgb(.08,.08,.10),green:rgb(.12,.48,.32)},color=palette[document.getElementById('watermarkColor').value]||palette.gray;doc.getPages().forEach(p=>{const {width,height}=p.getSize(),textWidth=font.widthOfTextAtSize(label,size),x=Math.max(18,(width-textWidth)/2),y=Math.max(24,(height-size)/2),base={size,font,color,opacity};if(style==='diagonal')p.drawText(label,{...base,x,y,rotate:degrees(45)});else if(style==='center')p.drawText(label,{...base,x,y});else if(style==='header')p.drawText(label,{...base,x:Math.max(18,(width-textWidth)/2),y:height-size-24});else if(style==='footer')p.drawText(label,{...base,x:Math.max(18,(width-textWidth)/2),y:24});else{const tileSize=Math.max(14,size*.72),tileWidth=font.widthOfTextAtSize(label,tileSize)+100;for(let ty=45;ty<height;ty+=125){for(let tx=20;tx<width;tx+=tileWidth){p.drawText(label,{...base,x:tx,y:ty,size:tileSize,rotate:degrees(30),opacity:opacity*.75})}}}});await savePdf(doc,'watermarked.pdf');}else{doc.getPages().forEach((p,i)=>p.drawText(document.getElementById('prefix').value+(i+1),{x:40,y:30,size:12,font,color:rgb(.45,.45,.65),opacity:.45}));await savePdf(doc,'numbered.pdf');}}
else if(fn==='imgpdf'){doc=await PDFDocument.create();for(const im of selected){const bytes=await im.arrayBuffer(),jpg=im.type==='image/jpeg',png=im.type==='image/png';if(!jpg&&!png)throw Error('Please select JPG or PNG images.');const emb=jpg?await doc.embedJpg(bytes):await doc.embedPng(bytes);const page=doc.addPage([emb.width,emb.height]);page.drawImage(emb,{x:0,y:0,width:page.getWidth(),height:page.getHeight()})}await savePdf(doc,'images.pdf');}
else if(fn==='ocr'){if(!window.pdfjsLib)throw Error('PDF reader library unavailable');if(!window.Tesseract)throw Error('OCR engine did not load. Refresh and try again.');pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;const lang=document.getElementById('ocrLang').value,scale=Number(document.getElementById('ocrScale').value);let result='';for(let n=1;n<=pdf.numPages;n++){out.textContent='Recognizing page '+n+' of '+pdf.numPages+'…';const page=await pdf.getPage(n),viewport=page.getViewport({scale}),canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;const recognized=await Tesseract.recognize(canvas,lang,{logger:m=>{if(m.status==='recognizing text')out.textContent='Page '+n+'/'+pdf.numPages+' — '+Math.round((m.progress||0)*100)+'%'}});result+='--- Page '+n+' ---\\n'+recognized.data.text+'\\n\\n';canvas.width=0;canvas.height=0;}download(new Blob([result],{type:'text/plain;charset=utf-8'}),'pdfway-ocr.txt');out.textContent='OCR complete. Recognized text downloaded as a TXT file.';return;}else if(fn==='text'||fn==='csv'||fn==='word'){if(!window.pdfjsLib)throw Error('PDF reader library unavailable');pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;let extracted='';for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i),tc=await page.getTextContent();extracted+=tc.items.map(x=>x.str).join(' ')+'\\n';}if(fn==='word'){if(!window.docx)throw Error('DOCX export library did not load. Refresh and try again.');const {Document,Paragraph,TextRun,Packer}=window.docx;const children=extracted.split(/\\n+/).filter(line=>line.trim()).map(line=>new Paragraph({children:[new TextRun({text:line})],spacing:{after:120}}));const wordDoc=new Document({sections:[{properties:{},children:children.length?children:[new Paragraph('No selectable text was found in this PDF.')]}]});const blob=await Packer.toBlob(wordDoc);download(blob,'pdfway-export.docx');}else if(fn==='csv'){const csv='Page text\\n"'+extracted.replace(/"/g,'""')+'"';download(new Blob([csv],{type:'text/csv'}),'extracted.csv');}else download(new Blob([extracted],{type:'text/plain'}),'extracted.txt');}else if(fn==='preview'){if(!window.pdfjsLib)throw Error('PDF reader library unavailable');pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;let pageNum=1,isRendering=false;out.innerHTML='<div class="preview-toolbar"><label for="previewMode">View style</label><select id="previewMode"><option value="standard">Standard PDF</option><option value="notebook">Notebook page-turn</option></select><span class="preview-status" aria-live="polite"></span></div><div class="preview-stage" tabindex="0" role="group" aria-label="PDF pages. Use left and right arrow keys or swipe to change pages."><div class="preview-page" id="previewPage"></div></div><p class="preview-hint">Notebook mode: swipe left or right, or use the arrow keys to turn pages.</p><div class="actions preview-actions"><button class="btn glass" id="previewPrev">← Previous</button><button class="btn glass" id="previewNext">Next →</button></div>';const status=out.querySelector('.preview-status'),holder=out.querySelector('.preview-page'),stage=out.querySelector('.preview-stage'),mode=document.getElementById('previewMode'),prev=document.getElementById('previewPrev'),next=document.getElementById('previewNext');function setMode(){stage.classList.toggle('notebook-mode',mode.value==='notebook');holder.classList.remove('turn-next','turn-prev')}mode.onchange=setMode;function updateControls(){prev.disabled=isRendering||pageNum<=1;next.disabled=isRendering||pageNum>=pdf.numPages;status.textContent='Page '+pageNum+' of '+pdf.numPages;}async function drawPage(direction=''){if(isRendering)return;isRendering=true;updateControls();holder.classList.remove('turn-next','turn-prev');try{if(mode.value==='notebook'&&direction){holder.classList.add(direction==='prev'?'turn-prev':'turn-next');await new Promise(resolve=>setTimeout(resolve,420));}const page=await pdf.getPage(pageNum),view=page.getViewport({scale:1.15}),canvas=document.createElement('canvas');canvas.width=Math.ceil(view.width);canvas.height=Math.ceil(view.height);canvas.style.width='100%';canvas.style.height='auto';await page.render({canvasContext:canvas.getContext('2d'),viewport:view}).promise;holder.replaceChildren(canvas);holder.classList.remove('turn-next','turn-prev');}finally{isRendering=false;updateControls();}}function changePage(direction){if(isRendering)return;if(direction==='next'&&pageNum<pdf.numPages){pageNum++;drawPage('next');}else if(direction==='prev'&&pageNum>1){pageNum--;drawPage('prev');}}prev.onclick=()=>changePage('prev');next.onclick=()=>changePage('next');let pointerStart=null;stage.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;pointerStart={x:e.clientX,y:e.clientY};});stage.addEventListener('pointerup',e=>{if(!pointerStart)return;const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;pointerStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25)changePage(dx<0?'next':'prev');});stage.addEventListener('pointercancel',()=>{pointerStart=null;});stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();changePage(e.key==='ArrowRight'?'next':'prev');}});setMode();await drawPage();return;}
else if(fn==='meta'){doc=await load(f);const values={title:document.getElementById('metaTitle').value.trim(),author:document.getElementById('metaAuthor').value.trim(),subject:document.getElementById('metaSubject').value.trim(),keywords:document.getElementById('metaKeywords').value.trim()};if(values.title)doc.setTitle(values.title);if(values.author)doc.setAuthor(values.author);if(values.subject)doc.setSubject(values.subject);if(values.keywords)doc.setKeywords(values.keywords.split(',').map(x=>x.trim()).filter(Boolean));await savePdf(doc,'updated-metadata.pdf');out.textContent='Metadata updated. The new PDF has been downloaded.';return}
else if(fn==='protect'){out.textContent='PDF-lib does not support password encryption in this browser workflow. No file changed.';return}
else if(fn==='unlock'){out.textContent='Select a PDF you have permission to open. Password removal requires its password and a compatible PDF processor; this browser demo does not bypass encryption.';return}
else if(fn==='crop'){doc=await load(f);const margin=24;doc.getPages().forEach(p=>{const s=p.getSize();p.setCropBox(margin,margin,s.width-2*margin,s.height-2*margin)});await savePdf(doc,'cropped.pdf')}else if(fn==='compress'){
const preset=document.getElementById('quality').value;
if(preset==='lossless'){
doc=await load(f);
const bytes=await doc.save({useObjectStreams:true,addDefaultPage:false});
const blob=new Blob([bytes],{type:'application/pdf'});
download(blob,'optimized-lossless.pdf');
const delta=((f.size-blob.size)/Math.max(f.size,1))*100;
out.textContent=`Lossless optimization complete. Original: ${(f.size/1024).toFixed(1)} KB · New: ${(blob.size/1024).toFixed(1)} KB · Size change: ${delta>=0?delta.toFixed(1)+'% smaller':Math.abs(delta).toFixed(1)+'% larger'}. Text and vector content are preserved.`;
return;
}
if(!window.pdfjsLib)throw Error('PDF rendering library did not load.');
pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;
const scale=preset==='small'?0.75:1.0,quality=preset==='small'?0.58:0.78;
const rasterDoc=await PDFDocument.create();
for(let n=1;n<=pdf.numPages;n++){
out.textContent='Compressing page '+n+' of '+pdf.numPages+'…';
const page=await pdf.getPage(n),base=page.getViewport({scale:1}),view=page.getViewport({scale});
const canvas=document.createElement('canvas');canvas.width=Math.ceil(view.width);canvas.height=Math.ceil(view.height);
const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
await page.render({canvasContext:ctx,viewport:view,background:'#ffffff'}).promise;
const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));
if(!blob)throw Error('Could not encode a page image.');
const jpg=await rasterDoc.embedJpg(await blob.arrayBuffer());
const outputPage=rasterDoc.addPage([base.width,base.height]);
outputPage.drawImage(jpg,{x:0,y:0,width:base.width,height:base.height});
canvas.width=0;canvas.height=0;
}
const bytes=await rasterDoc.save({useObjectStreams:true}),resultBlob=new Blob([bytes],{type:'application/pdf'});
download(resultBlob,preset==='small'?'compressed-smaller.pdf':'compressed-balanced.pdf');
const delta=((f.size-resultBlob.size)/Math.max(f.size,1))*100;
out.textContent=`Visual compression complete. Original: ${(f.size/1024).toFixed(1)} KB · New: ${(resultBlob.size/1024).toFixed(1)} KB · Size change: ${delta>=0?delta.toFixed(1)+'% smaller':Math.abs(delta).toFixed(1)+'% larger'}. Warning: pages are now images; text selection, links, forms and accessibility structure may be lost.`;
return;
}
else if(['compress','flatten','pdfimg'].includes(fn)){if(!window.pdfjsLib)throw Error('PDF rendering library did not load.');pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;const scale=fn==='compress'?0.8:1.4;let rasterDoc=await PDFDocument.create();for(let n=1;n<=pdf.numPages;n++){const page=await pdf.getPage(n),view=page.getViewport({scale}),canvas=document.createElement('canvas');canvas.width=Math.ceil(view.width);canvas.height=Math.ceil(view.height);await page.render({canvasContext:canvas.getContext('2d'),viewport:view}).promise;if(fn==='pdfimg'){const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='page-'+n+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),3000)}else{const png=await rasterDoc.embedPng(canvas.toDataURL('image/png'));const p=rasterDoc.addPage([png.width,png.height]);p.drawImage(png,{x:0,y:0,width:p.getWidth(),height:p.getHeight()})}}if(fn!=='pdfimg')await savePdf(rasterDoc,fn==='compress'?'compressed-raster.pdf':'flattened-raster.pdf');out.textContent=fn==='compress'?'Raster-compressed export downloaded. Text may no longer be selectable.':fn==='flatten'?'Raster-flattened export downloaded. Text/forms are flattened into images.':'PNG page downloads should have started.'}else if(fn==='compare'){
if(selected.length<2)throw Error('Choose two PDF files to compare.');
if(!window.pdfjsLib)throw Error('PDF reader library did not load.');
pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
async function readPdfText(file){const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;const pages=[];for(let n=1;n<=pdf.numPages;n++){const page=await pdf.getPage(n),tc=await page.getTextContent();pages.push(tc.items.map(x=>x.str).join(' ').replace(/\\s+/g,' ').trim());}return pages;}
const [left,right]=await Promise.all([readPdfText(selected[0]),readPdfText(selected[1])]);
const total=Math.max(left.length,right.length);let same=0,changed=0,rows='';
for(let i=0;i<total;i++){const a=left[i]??'[Page missing]',b=right[i]??'[Page missing]';const equal=a===b;if(equal)same++;else changed++;const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));rows+=`<details class="compare-row" ${equal?'':'open'}><summary>Page ${i+1} · ${equal?'No text difference':'Different'}</summary><div class="compare-columns"><section><strong>${esc(selected[0].name)}</strong><p>${esc(a||'[No selectable text found]')}</p></section><section><strong>${esc(selected[1].name)}</strong><p>${esc(b||'[No selectable text found]')}</p></section></div></details>`;}
out.innerHTML=`<div class="compare-summary"><strong>Text comparison complete</strong><p>${same} matching page(s) · ${changed} page(s) with text differences · ${total} pages checked</p><small>This compares extracted text page by page, not visual layout, images, handwriting, or formatting.</small></div><div class="compare-results">${rows}</div>`;
return;
}
else throw Error('This tool is not available yet.');
out.textContent='Done! Your download should begin shortly.';}catch(err){out.textContent='Could not process: '+err.message}}

async function launchAnnotationEditor(file,out){
  if(!window.pdfjsLib)throw Error('PDF reader library did not load.');
  if(!window.PDFLib)throw Error('PDF editing library did not load.');
  pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
  const annotations=[];
  let pageNumber=1,mode='text',viewport=null,active=null;
  let stampImage=null,stampData=null,stampKind='image';
  let signatureDrawing=false,signatureHasInk=false;
  const imageCache=new Map();
  out.innerHTML=
    '<div class="annotation-editor">'+
      '<div class="annotation-toolbar">'+
        '<label>Page <input id="annPage" type="number" min="1" max="'+pdf.numPages+'" value="1"></label>'+
        '<button class="btn glass" id="annPrev" type="button">←</button>'+
        '<button class="btn glass" id="annNext" type="button">→</button>'+
        '<label>Tool <select id="annMode"><option value="text">Add text</option><option value="highlight">Highlight</option><option value="draw">Draw</option></select></label>'+
        '<label>Text <input id="annText" type="text" maxlength="240" placeholder="Type a note"></label>'+
        '<label>Color <input id="annColor" type="color" value="#ffca55"></label>'+
        '<label>Size <input id="annSize" type="number" min="8" max="72" value="22"></label>'+
        '<label>Image stamp <input id="annImage" type="file" accept="image/png,image/jpeg,image/webp"></label>'+
      '</div>'+
      '<section class="signature-panel" aria-label="Signature pad">'+
        '<div><strong>Signature pad</strong><p>Draw your handwritten signature, then choose Use signature and click on the PDF page to place it.</p></div>'+
        '<canvas id="annSignaturePad" width="600" height="170" aria-label="Draw signature here"></canvas>'+
        '<div class="signature-actions"><button class="btn glass" id="annSignatureClear" type="button">Clear pad</button><button class="btn primary" id="annSignatureUse" type="button">Use signature</button></div>'+
      '</section>'+
      '<p class="annotation-help">Text: click to place. Highlight and Draw: drag on the page. Image stamp or signature: choose it, then click the page. Use Undo to remove the last mark.</p>'+
      '<div class="annotation-stage" id="annStage"><canvas id="annPageCanvas"></canvas><canvas id="annOverlay" aria-label="PDF annotation surface"></canvas></div>'+
      '<div class="annotation-footer"><span id="annStatus" aria-live="polite">Page 1 of '+pdf.numPages+'</span><div><button class="btn glass" id="annUndo" type="button">Undo</button><button class="btn glass" id="annClear" type="button">Clear this page</button><button class="btn primary" id="annSave" type="button">Download annotated PDF</button></div></div>'+
      '<p class="annotation-note">Annotations are added as a transparent overlay. Existing PDF text remains intact. The selected file is processed in this browser; only the final download is created.</p>'+
    '</div>';
  const pageInput=out.querySelector('#annPage');
  const prev=out.querySelector('#annPrev');
  const next=out.querySelector('#annNext');
  const modeInput=out.querySelector('#annMode');
  const textInput=out.querySelector('#annText');
  const colorInput=out.querySelector('#annColor');
  const sizeInput=out.querySelector('#annSize');
  const imageInput=out.querySelector('#annImage');
  const signaturePad=out.querySelector('#annSignaturePad');
  const signatureCtx=signaturePad.getContext('2d');
  const pageCanvas=out.querySelector('#annPageCanvas');
  const overlay=out.querySelector('#annOverlay');
  const stage=out.querySelector('#annStage');
  const status=out.querySelector('#annStatus');
  const ctx=overlay.getContext('2d');
  const pageCtx=pageCanvas.getContext('2d');
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  function color(){return colorInput.value||'#ffca55';}
  function size(){return clamp(Number(sizeInput.value)||22,8,72);}
  function cacheImage(data){
    let image=imageCache.get(data);
    if(image)return image;
    image=new Image();
    imageCache.set(data,image);
    image.onload=()=>redrawOverlay();
    image.src=data;
    return image;
  }
  async function ensureImage(data){
    const image=cacheImage(data);
    if(image.complete&&image.naturalWidth)return image;
    await new Promise((resolve,reject)=>{
      image.onload=resolve;
      image.onerror=()=>reject(Error('Could not read the selected image.'));
    });
    return image;
  }
  function point(event){
    const rect=overlay.getBoundingClientRect();
    return {
      x:clamp((event.clientX-rect.left)/rect.width,0,1),
      y:clamp((event.clientY-rect.top)/rect.height,0,1)
    };
  }
  function drawItem(context,item,width,height,scale){
    context.save();
    if(item.type==='text'){
      context.fillStyle=item.color;
      context.globalAlpha=1;
      context.font=(item.size*scale)+'px Arial, sans-serif';
      context.textBaseline='top';
      const lines=item.text.split('\n');
      lines.forEach((line,index)=>context.fillText(line,item.x*width,item.y*height+index*item.size*scale*1.25));
    }else if(item.type==='highlight'){
      context.fillStyle=item.color;
      context.globalAlpha=.30;
      context.fillRect(item.x*width,item.y*height,item.w*width,item.h*height);
    }else if(item.type==='image'||item.type==='signature'){
      const image=imageCache.get(item.data);
      if(image&&image.complete&&image.naturalWidth){
        const drawWidth=item.w*width;
        const drawHeight=drawWidth*image.naturalHeight/image.naturalWidth;
        context.globalAlpha=1;
        context.drawImage(image,item.x*width,item.y*height,drawWidth,drawHeight);
      }
    }else if(item.type==='draw'){
      if(item.points.length>1){
        context.strokeStyle=item.color;
        context.globalAlpha=1;
        context.lineWidth=Math.max(2,item.size*scale*.12);
        context.lineCap='round';
        context.lineJoin='round';
        context.beginPath();
        context.moveTo(item.points[0].x*width,item.points[0].y*height);
        item.points.slice(1).forEach(p=>context.lineTo(p.x*width,p.y*height));
        context.stroke();
      }
    }
    context.restore();
  }
  function redrawOverlay(){
    ctx.clearRect(0,0,overlay.width,overlay.height);
    const scale=viewport?viewport.scale:1;
    annotations.filter(item=>item.page===pageNumber).forEach(item=>drawItem(ctx,item,overlay.width,overlay.height,scale));
    if(active)drawItem(ctx,active,overlay.width,overlay.height,scale);
  }
  async function renderPage(){
    status.textContent='Rendering page '+pageNumber+'…';
    const page=await pdf.getPage(pageNumber);
    viewport=page.getViewport({scale:1.45,rotation:0});
    pageCanvas.width=Math.ceil(viewport.width);
    pageCanvas.height=Math.ceil(viewport.height);
    overlay.width=pageCanvas.width;
    overlay.height=pageCanvas.height;
    pageCanvas.style.width='100%';
    pageCanvas.style.height='auto';
    overlay.style.width='100%';
    overlay.style.height='100%';
    await page.render({canvasContext:pageCtx,viewport}).promise;
    redrawOverlay();
    pageInput.value=pageNumber;
    pageInput.max=pdf.numPages;
    prev.disabled=pageNumber<=1;
    next.disabled=pageNumber>=pdf.numPages;
    status.textContent='Page '+pageNumber+' of '+pdf.numPages+' · '+annotations.filter(item=>item.page===pageNumber).length+' annotation(s)';
  }
  function changePage(value){
    const target=clamp(Number(value)||1,1,pdf.numPages);
    if(target===pageNumber)return;
    if(active){active=null;redrawOverlay();}
    pageNumber=target;
    renderPage().catch(error=>{status.textContent='Could not render page: '+error.message;});
  }
  pageInput.addEventListener('change',()=>changePage(pageInput.value));
  prev.addEventListener('click',()=>changePage(pageNumber-1));
  next.addEventListener('click',()=>changePage(pageNumber+1));
  modeInput.insertAdjacentHTML('beforeend','<option value="image">Place image / signature</option>');
  modeInput.addEventListener('change',()=>{mode=modeInput.value;overlay.style.cursor=mode==='text'?'text':mode==='image'?'copy':'crosshair';});
  function padPoint(event){
    const rect=signaturePad.getBoundingClientRect();
    return {x:(event.clientX-rect.left)*signaturePad.width/rect.width,y:(event.clientY-rect.top)*signaturePad.height/rect.height};
  }
  signaturePad.addEventListener('pointerdown',event=>{
    signatureDrawing=true;
    signatureHasInk=true;
    signaturePad.setPointerCapture(event.pointerId);
    const p=padPoint(event);
    signatureCtx.beginPath();
    signatureCtx.moveTo(p.x,p.y);
    signatureCtx.strokeStyle=color()==='#ffca55'?'#17233b':color();
    signatureCtx.lineWidth=clamp(size()/7,2,8);
    signatureCtx.lineCap='round';
    signatureCtx.lineJoin='round';
  });
  signaturePad.addEventListener('pointermove',event=>{
    if(!signatureDrawing)return;
    const p=padPoint(event);
    signatureCtx.lineTo(p.x,p.y);
    signatureCtx.stroke();
  });
  const finishSignature=()=>{signatureDrawing=false;};
  signaturePad.addEventListener('pointerup',finishSignature);
  signaturePad.addEventListener('pointercancel',finishSignature);
  out.querySelector('#annSignatureClear').addEventListener('click',()=>{
    signatureCtx.clearRect(0,0,signaturePad.width,signaturePad.height);
    signatureHasInk=false;
    status.textContent='Signature pad cleared.';
  });
  out.querySelector('#annSignatureUse').addEventListener('click',()=>{
    if(!signatureHasInk){status.textContent='Draw your signature in the pad first.';return;}
    stampData=signaturePad.toDataURL('image/png');
    stampImage=cacheImage(stampData);
    stampKind='signature';
    modeInput.value='image';
    mode='image';
    overlay.style.cursor='copy';
    status.textContent=stampImage.complete&&stampImage.naturalWidth?'Signature ready. Click on the PDF page to place it.':'Loading signature…';
    if(!stampImage.complete||!stampImage.naturalWidth)stampImage.addEventListener('load',()=>{status.textContent='Signature ready. Click on the PDF page to place it.';},{once:true});
  });
  imageInput.addEventListener('change',()=>{
    const file=imageInput.files&&imageInput.files[0];
    if(!file)return;
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)){
      status.textContent='Choose a PNG, JPG or WebP image.';
      imageInput.value='';
      return;
    }
    const reader=new FileReader();
    reader.onload=()=>{
      stampData=String(reader.result);
      stampImage=cacheImage(stampData);
      stampKind='image';
      modeInput.value='image';
      mode='image';
      overlay.style.cursor='copy';
      status.textContent=stampImage.complete&&stampImage.naturalWidth?'Image ready. Click on the PDF page to place it.':'Loading image…';
      if(!stampImage.complete||!stampImage.naturalWidth)stampImage.addEventListener('load',()=>{status.textContent='Image ready. Click on the PDF page to place it.';},{once:true});
    };
    reader.onerror=()=>{status.textContent='Could not read that image file.';};
    reader.readAsDataURL(file);
  });
  overlay.addEventListener('pointerdown',event=>{
    if(event.button!==undefined&&event.button!==0)return;
    const p=point(event);
    mode=modeInput.value;
    if(mode==='image'){
      if(!stampImage||!stampData||!stampImage.complete||!stampImage.naturalWidth){
        status.textContent='Choose an image or create a signature first.';
        return;
      }
      const widthPct=Math.min(.48,Math.max(.08,size()/100));
      const aspect=stampImage.naturalWidth/stampImage.naturalHeight;
      const drawHeight=(widthPct*overlay.width/aspect)/overlay.height;
      const x=clamp(p.x,0,Math.max(0,1-widthPct));
      const y=clamp(p.y,0,Math.max(0,1-drawHeight));
      annotations.push({type:stampKind,page:pageNumber,x,y,w:widthPct,data:stampData});
      redrawOverlay();
      status.textContent=(stampKind==='signature'?'Signature':'Image stamp')+' placed. You can move to another page or add another.';
      return;
    }
    if(mode==='text'){
      const value=textInput.value.trim();
      if(!value){status.textContent='Type your note first, then click on the page.';return;}
      annotations.push({type:'text',page:pageNumber,x:p.x,y:p.y,text:value,color:color(),size:size()});
      redrawOverlay();
      status.textContent='Text note added. You can add more notes or download the PDF.';
      return;
    }
    active=mode==='highlight'
      ?{type:'highlight',page:pageNumber,x:p.x,y:p.y,w:0,h:0,color:color(),size:size()}
      :{type:'draw',page:pageNumber,points:[p],color:color(),size:size()};
    overlay.setPointerCapture(event.pointerId);
    redrawOverlay();
  });
  overlay.addEventListener('pointermove',event=>{
    if(!active)return;
    const p=point(event);
    if(active.type==='highlight'){
      active.w=p.x-active.x;
      active.h=p.y-active.y;
    }else if(active.type==='draw'){
      const last=active.points[active.points.length-1];
      if(!last||Math.hypot(p.x-last.x,p.y-last.y)>.0015)active.points.push(p);
    }
    redrawOverlay();
  });
  function finishMark(){
    if(!active)return;
    if(active.type==='highlight'){
      const x=Math.min(active.x,active.x+active.w),y=Math.min(active.y,active.y+active.h);
      active.x=x;active.y=y;active.w=Math.abs(active.w);active.h=Math.abs(active.h);
    }
    if(active.type==='highlight'&&(active.w<.003||active.h<.003)){active=null;redrawOverlay();return;}
    if(active.type==='draw'&&active.points.length<2){active=null;redrawOverlay();return;}
    annotations.push(active);
    active=null;
    redrawOverlay();
    status.textContent='Annotation added. '+annotations.filter(item=>item.page===pageNumber).length+' mark(s) on this page.';
  }
  overlay.addEventListener('pointerup',finishMark);
  overlay.addEventListener('pointercancel',finishMark);
  out.querySelector('#annUndo').addEventListener('click',()=>{
    for(let i=annotations.length-1;i>=0;i--){
      if(annotations[i].page===pageNumber){annotations.splice(i,1);break;}
    }
    redrawOverlay();
    status.textContent='Last annotation on this page removed.';
  });
  out.querySelector('#annClear').addEventListener('click',()=>{
    for(let i=annotations.length-1;i>=0;i--)if(annotations[i].page===pageNumber)annotations.splice(i,1);
    redrawOverlay();
    status.textContent='Annotations cleared from this page.';
  });
  out.querySelector('#annSave').addEventListener('click',async()=>{
    const saveButton=out.querySelector('#annSave');
    if(!annotations.length){status.textContent='Add at least one annotation before downloading.';return;}
    saveButton.disabled=true;
    status.textContent='Preparing annotated PDF…';
    try{
      const {PDFDocument}=PDFLib;
      const output=await PDFDocument.load(await file.arrayBuffer());
      const pages=output.getPages();
      for(const item of annotations){
        if(item.type==='image'||item.type==='signature')await ensureImage(item.data);
      }
      const exportScale=2;
      for(let index=0;index<pages.length;index++){
        const pageItems=annotations.filter(item=>item.page===index+1);
        if(!pageItems.length)continue;
        const sourcePage=await pdf.getPage(index+1);
        const exportViewport=sourcePage.getViewport({scale:exportScale,rotation:0});
        const exportCanvas=document.createElement('canvas');
        exportCanvas.width=Math.ceil(exportViewport.width);
        exportCanvas.height=Math.ceil(exportViewport.height);
        const exportContext=exportCanvas.getContext('2d');
        pageItems.forEach(item=>drawItem(exportContext,item,exportCanvas.width,exportCanvas.height,exportScale));
        const pngBlob=await new Promise(resolve=>exportCanvas.toBlob(resolve,'image/png'));
        if(!pngBlob)throw Error('Could not create annotation image for page '+(index+1)+'.');
        const embedded=await output.embedPng(await pngBlob.arrayBuffer());
        const targetPage=pages[index];
        const crop=targetPage.getCropBox();
        targetPage.drawImage(embedded,{x:crop.x,y:crop.y,width:crop.width,height:crop.height});
        exportCanvas.width=0;exportCanvas.height=0;
      }
      const bytes=await output.save({useObjectStreams:true});
      const blob=new Blob([bytes],{type:'application/pdf'});
      const link=document.createElement('a');
      link.href=URL.createObjectURL(blob);
      link.download='annotated-'+file.name.replace(/\.pdf$/i,'')+'.pdf';
      link.click();
      setTimeout(()=>URL.revokeObjectURL(link.href),3000);
      status.textContent='Annotated PDF downloaded. Your original file was not changed.';
    }catch(error){
      status.textContent='Could not export annotations: '+error.message;
    }finally{saveButton.disabled=false;}
  });
  await renderPage();
}

document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('searchTools').focus()}if(e.key==='Escape'){modal.classList.remove('show');toolBack.classList.remove('show')}});


/* PDFWay PWA: install prompt, connection status and user-controlled updates */
(()=>{
  const installButton=document.getElementById('installBtn');
  const status=document.getElementById('pwaStatus');
  const updateBanner=document.getElementById('pwaUpdateBanner');
  const updateButton=document.getElementById('pwaUpdateBtn');
  const dismissButton=document.getElementById('pwaUpdateDismiss');
  let installPrompt=null;
  let registration=null;
  let applyUpdate=false;
  let refreshing=false;
  const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  function refreshInstallButton(){if(installButton)installButton.hidden=standalone()||!installPrompt;}
  function refreshConnectionStatus(){
    if(!status)return;
    const online=navigator.onLine;
    status.textContent=online?'● Online · Ready':'● Offline · Cached app only; some tools need internet';
    status.classList.toggle('is-offline',!online);
  }
  function showUpdate(){if(updateBanner)updateBanner.hidden=false;}
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;refreshInstallButton();});
  window.addEventListener('appinstalled',()=>{installPrompt=null;refreshInstallButton();});
  if(installButton){
    installButton.addEventListener('click',async()=>{
      if(!installPrompt)return;
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt=null;
      refreshInstallButton();
    });
    refreshInstallButton();
  }
  refreshConnectionStatus();
  window.addEventListener('online',refreshConnectionStatus);
  window.addEventListener('offline',refreshConnectionStatus);
  if(dismissButton)dismissButton.addEventListener('click',()=>{if(updateBanner)updateBanner.hidden=true;});
  if(updateButton)updateButton.addEventListener('click',()=>{
    if(!registration||!registration.waiting)return;
    applyUpdate=true;
    registration.waiting.postMessage({type:'SKIP_WAITING'});
  });
  if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
    window.addEventListener('load',async()=>{
      try{
        registration=await navigator.serviceWorker.register('./sw.js',{scope:'./'});
        if(registration.waiting&&navigator.serviceWorker.controller)showUpdate();
        registration.addEventListener('updatefound',()=>{
          const worker=registration.installing;
          if(!worker)return;
          worker.addEventListener('statechange',()=>{
            if(worker.state==='installed'&&navigator.serviceWorker.controller)showUpdate();
          });
        });
        navigator.serviceWorker.addEventListener('controllerchange',()=>{
          if(applyUpdate&&!refreshing){refreshing=true;window.location.reload();}
        });
        window.addEventListener('online',()=>registration.update().catch(()=>{}));
        document.addEventListener('visibilitychange',()=>{
          if(document.visibilityState==='visible')registration.update().catch(()=>{});
        });
      }catch(err){console.warn('PDFWay offline setup unavailable:',err);}
    });
  }
})();

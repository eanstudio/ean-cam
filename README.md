# ean-cam

Mobilā svītrkodu skenera PWA instalēšanai telefonā:

- Publicē vietnes saknē `index.html`, `manifest.json`, `sw.js` un `icons/` mapes PNG ikonas.
- PWA instalēšanai atver vietni pa HTTPS; lokālai pārbaudei izmanto `localhost`.
- Android pārlūkā izvēlies **Install app / Add to Home screen**; iPhone Safari — **Share → Add to Home Screen**.
- Android APK veidošanas darbplūsma automātiski iekopē PWA failus lietotnes resursos.
- Servisa darbinieks bezsaistē kešo lietotnes sākuma lapu.
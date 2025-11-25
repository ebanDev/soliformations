<template>
  <UApp>
    <div class="flex flex-wrap gap-6 min-h-screen justify-center bg-gray-100 p-6">
        <UCard class="mb-4 w-96 h-full" variant="outline">
          <template #header>
            <h2 class="text-lg font-bold">Ma formation</h2>
          </template>

          <div class="flex gap-4 flex-col">
            <UFormField label="Nom">
              <UInput placeholder="Nom de la formation" v-model="formationName" class="w-full" />
            </UFormField>

            <UFormField label="Description">
              <UTextarea placeholder="Description de la formation" v-model="formationDescription" class="w-full" />
            </UFormField>

            <UFormField label="Date et heure">
              <UInput type="datetime-local" class="w-full" v-model="formationDate" />
            </UFormField>

            <UFormField label="Lieu">
              <UInput placeholder="Lieu de la formation" v-model="formationLocation" class="w-full" />
            </UFormField>

            <UFormField label="Image d'illustration">
              <UFileUpload placeholder="URL de l'image" v-model="formationImage" class="w-full" icon="ph:upload-bold" />
            </UFormField>

            <UFormField label="Police d'écriture">
              <USelect v-model="formationFont" class="w-full" :items="[
                { label: 'Solidaires Boum', value: 'Solidaires Boum' },
                { label: 'Solidaires Action', value: 'Solidaires Action' },
                { label: 'Solidaires Cortege', value: 'Solidaires Cortege' },
                { label: 'Solidaires Manif', value: 'Solidaires Manif' },
              ]" />
            </UFormField>
          </div>
        </UCard>
        <UCard class="w-3xl h-full" variant="outline">
          <template #header>
            <h2 class="text-lg font-bold">Post Instagram</h2>
          </template>

          <div class="flex gap-4">
            <svg ref="svgRef" class="rounded-lg flex-1 max-w-md" viewBox="0 0 1080 1350"
              xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="backgroundPattern" patternUnits="userSpaceOnUse" width="100%" height="100%">
                  <image ref="backgroundImageRef" href="" width="100%" height="100%"
                    preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <pattern id="noisePattern" patternUnits="userSpaceOnUse" width="100%" height="100%">
                  <image ref="noiseImageRef" href="/noise.png" width="4096" height="4096" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#backgroundPattern)"
                style="filter: brightness(80%) contrast(134%) saturate(0%)" />
              <rect width="100%" height="100%" fill="#832727" fill-opacity="0.3" />
              <rect width="100%" height="100%" fill="#832727" fill-opacity="0.2" style="mix-blend-mode: overlay" />
              <rect width="100%" height="100%" fill="url(#noisePattern)" fill-opacity="0.8"
                style="mix-blend-mode: overlay" />
              <text x="50%" y="20%" text-anchor="middle" font-size="92" fill="white" class="font-subtitle">
                Causerie
              </text>
              <text x="50%" y="520" text-anchor="middle" font-size="144" fill="white" class="font-title"
                font-weight="800" dominant-baseline="middle">
                <tspan v-for="(line, index) in titleLines" :key="index" x="50%"
                  :dy="index === 0 ? `${-((titleLines.length - 1) * 0.6)}em` : '1.2em'">
                  {{ line }}
                </tspan>
              </text>

              <g ref="dateGroupRef" :transform="dateTransform">
                <image href="/calendar.svg" :width="iconWidth" :height="iconWidth" :y="-iconWidth / 2" />
                <text class="font-subtitle" font-size="60" font-weight="800" fill="white" text-anchor="start"
                  :x="iconTextOffset" y="0" dominant-baseline="middle">
                  {{ formattedDateTime || 'Date et heure' }}
                </text>
              </g>

              <g ref="locationGroupRef" :transform="locationTransform">
                <image href="/location.svg" :width="iconWidth" :height="iconWidth" :y="-iconWidth / 2" />
                <text class="font-subtitle" font-size="60" font-weight="800" fill="white" text-anchor="start"
                  :x="iconTextOffset" y="0" dominant-baseline="middle">
                  {{ formationLocation || 'Lieu de la formation' }}
                </text>
              </g>

              <rect x="22.5%" y="86.5%" width="55%" height="8%" fill="#B22222"
                rx="20" ry="20" />
              <text x="50%" y="91.5%" text-anchor="middle" font-size="48" fill="white" class="font-title" font-weight="900">
                SOLIDAIRES ÉTUDIANT·E·S 33
              </text>
            </svg>

            <svg ref="svgRef2" class="rounded-lg flex-1 max-w-md" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="backgroundPattern2" patternUnits="userSpaceOnUse" width="100%" height="100%">
                  <image ref="backgroundImageRef2" href="" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <pattern id="noisePattern2" patternUnits="userSpaceOnUse" width="100%" height="100%">
                  <image ref="noiseImageRef2" href="/noise.png" width="4096" height="4096" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#backgroundPattern2)" style="filter: brightness(50%) contrast(134%) saturate(0%)" />
              <rect width="100%" height="100%" fill="#832727" fill-opacity="0.3" />
              <rect width="100%" height="100%" fill="#832727" fill-opacity="0.2" style="mix-blend-mode: overlay" />
              <rect width="100%" height="100%" fill="url(#noisePattern2)" fill-opacity="0.8" style="mix-blend-mode: overlay" />
              <text x="50%" y="15%" text-anchor="middle" font-size="92" fill="white" class="font-title">
                <tspan v-for ="(line, index) in titleLines" :key="index" x="50%" :dy="index === 0 ? `${-((titleLines.length - 1) * 0.6)}em` : '1.2em'">
                  {{ line }}
                </tspan>
              </text>
              <text x="10%" y="53%" text-anchor="left" font-size="56" fill="white" class="font-subtitle" font-weight="800" dominant-baseline="middle">
                <tspan v-for="(line, index) in descriptionLines" :key="index" x="10%" :dy="index === 0 ? `${-((descriptionLines.length - 1) * 0.6)}em` : '1.2em'">
                  {{ line }}
                </tspan>
              </text>
              <rect x="22.5%" y="86.5%" width="55%" height="8%" fill="#B22222" rx="20" ry="20" />
              <text x="50%" y="91.5%" text-anchor="middle" font-size="48" fill="white" class="font-title" font-weight="900">
                SOLIDAIRES ÉTUDIANT·E·S 33
              </text>
            </svg>
          </div>
          <div class="mt-4">
            <UButton icon="ph:download-simple-bold" @click="downloadPng" :loading="isDownloading">
              Télécharger les images
            </UButton>
          </div>
        </UCard>

        <UCard class="w-xl h-full" >
          <template #header>
            <h2 class="text-lg font-bold">Message WhatsApp</h2>
          </template>

          <p>
            <strong>Causerie Solidaires Étudiant·e·s 33 🪧💥</strong>
            <br />
            Nous organisons cette semaine une causerie sur le thème <strong>{{ formationName || 'NOM DE LA FORMATION' }}</strong>. <br /> <br />
            ℹ️ {{ formationDescription || 'Description de la formation' }} <br /> <br />
            📅 <strong>{{ formattedLongDateTime || 'Date et heure' }}</strong> <br />
            📍 <strong>{{ formationLocation || 'Lieu de la formation' }}</strong> <br />

            Comme chaque semaine, cet évènement est ouvert à toutes et tous, n'hésitez pas à venir ! <br />
          </p>

          <UButton :icon="copyFeedback ? 'ph:check-bold' : 'ph:copy-bold'" @click="copyWhatsappMessage" class="mt-4">
            Copier le message
          </UButton>
        </UCard>
      </div>
  </UApp>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';

// IndexedDB storage management for persistence
const storage = useStorage();

// Initialize refs with defaults
const formationName = ref('');
const formationDescription = ref('');
const formationImage = ref<File | null>(null);
const formationImageDataUrl = ref<string | null>(null);
const formationDate = ref('');
const formationLocation = ref('');
const formationFont = ref('Solidaires Boum');

const backgroundImageRef = ref<SVGImageElement>();
const svgRef = ref<SVGSVGElement>();
const noiseImageRef = ref<SVGImageElement>();
const dateGroupRef = ref<SVGGElement>();
const locationGroupRef = ref<SVGGElement>();

const backgroundImageRef2 = ref<SVGImageElement>();
const svgRef2 = ref<SVGSVGElement>();
const noiseImageRef2 = ref<SVGImageElement>();

const dateTransform = ref('translate(486 783)');
const locationTransform = ref('translate(486 878)');

const iconWidth = 64;
const iconGap = 24;
const iconTextOffset = iconWidth + iconGap;

const copyFeedback = ref(false);
const isDownloading = ref(false);

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const formattedDateTime = computed(() => {
  if (!formationDate.value) return '';
  const date = new Date(formationDate.value);
  return capitalizeFirstLetter(date.toLocaleDateString('fr-FR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
  }));
});

const formattedLongDateTime = computed(() => {
  if (!formationDate.value) return '';
  const date = new Date(formationDate.value);
  return capitalizeFirstLetter(date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }));
});

const titleLines = computed(() => {
  const raw = (formationName.value || 'NOM DE LA FORMATION').toUpperCase().trim();
  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length === 0) return ['NOM DE LA FORMATION'];

  const lines: string[] = [];
  let current = '';
  const MAX_LENGTH = 16;

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }
    const candidate = `${current} ${word}`;
    if (candidate.length <= MAX_LENGTH) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  return lines;
});

const descriptionLines = computed(() => {
  const raw = (formationDescription.value || 'Description de la formation').trim();
  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length === 0) return ['Description de la formation'];

  const lines: string[] = [];
  let current = '';
  const MAX_LENGTH = 30;

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }
    const candidate = `${current} ${word}`;
    if (candidate.length <= MAX_LENGTH) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  return lines;
});

const recomputeIconGroupTransform = (group: SVGGElement | undefined | null, y: number) => {
  if (!group) return null;
  const previous = group.getAttribute('transform');
  group.setAttribute('transform', 'translate(0 0)');
  const bbox = group.getBBox();
  const x = 540 - (bbox.x + bbox.width / 2);
  if (previous) {
    group.setAttribute('transform', previous);
  } else {
    group.removeAttribute('transform');
  }
  return `translate(${x} ${y})`;
};

const updateIconRowLayout = async () => {
  await nextTick();
  const date = recomputeIconGroupTransform(dateGroupRef.value, 783);
  if (date) dateTransform.value = date;
  const location = recomputeIconGroupTransform(locationGroupRef.value, 878);
  if (location) locationTransform.value = location;
};

const updateBackground = () => {
  if (backgroundImageRef.value) backgroundImageRef.value.setAttribute('href', formationImageDataUrl.value || '');
  if (backgroundImageRef2.value) backgroundImageRef2.value.setAttribute('href', formationImageDataUrl.value || '');
};

// Watch for form field changes and save to IndexedDB
watch(formationName, (value) => {
  storage.setItem('formationName', value);
});

watch(formationDescription, (value) => {
  storage.setItem('formationDescription', value);
});

watch(formationDate, (value) => {
  storage.setItem('formationDate', value);
});

watch(formationLocation, (value) => {
  storage.setItem('formationLocation', value);
});

watch(formationFont, (newFont) => {
  storage.setItem('formationFont', newFont);
  document.documentElement.style.setProperty('--font-title', newFont);
  updateIconRowLayout();
});

// Watch for image changes and save to IndexedDB as data URL
watch(formationImage, async (file) => {
  if (file) {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = () => reject(fr.error);
      fr.readAsDataURL(file);
    });
    formationImageDataUrl.value = dataUrl;
    storage.setItem('formationImageData', dataUrl);
  } else {
    formationImageDataUrl.value = null;
    storage.removeItem('formationImageData');
  }
  updateBackground();
  await nextTick();
  updateIconRowLayout();
});

watch([formattedDateTime, formationLocation], () => {
  updateIconRowLayout();
});

onMounted(async () => {
  // Migrate data from localStorage to IndexedDB (if not already done)
  await storage.migrateFromLocalStorage();

  // Load values from IndexedDB
  formationName.value = (await storage.getItem('formationName')) || '';
  formationDescription.value = (await storage.getItem('formationDescription')) || '';
  formationDate.value = (await storage.getItem('formationDate')) || '';
  formationLocation.value = (await storage.getItem('formationLocation')) || '';
  formationFont.value = (await storage.getItem('formationFont')) || 'Solidaires Boum';
  document.documentElement.style.setProperty('--font-title', formationFont.value);
  updateIconRowLayout();

  // Restore image from IndexedDB if available
  const stored = await storage.getItem('formationImageData');
  if (stored) {
    formationImageDataUrl.value = stored;
    updateBackground();
    updateIconRowLayout();
    // Attempt to recreate File for UI consistency, but background already restored
    fetch(stored)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'restored-image.png', { type: blob.type });
        formationImage.value = file;
      })
      .catch(() => {
        // If recreation fails, keep the background preview
      });
  } else {
    updateBackground();
    updateIconRowLayout();
  }
});

// Download the current SVG posts as 1080×1350 PNGs
const downloadPng = async () => {
  const DEBUG = import.meta.dev;
  isDownloading.value = true;

  const downloadSvgAsPng = async (svgEl: SVGSVGElement, filename: string) => {
    // Helper: fetch a URL and convert to data URL
    const toDataUrl = async (url: string) => {
      DEBUG && console.log('[export] fetching for data URL:', url);
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const listExternalRefs = (root: SVGSVGElement) => {
      const svgImgs: string[] = [];
      const htmlImgs: string[] = [];
      root.querySelectorAll('image').forEach((img) => {
        const href = img.getAttribute('href') || img.getAttribute('xlink:href') || '';
        if (href && !href.startsWith('data:')) svgImgs.push(href);
      });
      root.querySelectorAll('foreignObject img').forEach((img) => {
        const src = img.getAttribute('src') || '';
        if (src && !src.startsWith('data:')) htmlImgs.push(src);
      });
      return { svgImgs, htmlImgs };
    };

    // Clone the SVG to avoid mutating the preview
    const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;
    // Ensure intrinsic size and namespaces are present for serialization and rendering
    clonedSvg.setAttribute('width', '1080');
    clonedSvg.setAttribute('height', '1350');
    if (!clonedSvg.getAttribute('xmlns')) clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    if (!clonedSvg.getAttribute('xmlns:xlink')) clonedSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    DEBUG && console.log('[export] external refs before inline:', listExternalRefs(svgEl));

    // Ensure fonts are set inline where needed (avoid relying on external CSS variables)
    try {
      // Set font-family on SVG <text> elements with class 'font-title'/'font-subtitle'
      clonedSvg.querySelectorAll<SVGTextElement>('text.font-title').forEach(t => {
        t.setAttribute('font-family', `${formationFont.value}, sans-serif`);
        t.setAttribute('font-weight', '900');
      });
      clonedSvg.querySelectorAll<SVGTextElement>('text.font-subtitle').forEach(t => {
        t.setAttribute('font-family', 'Sen, sans-serif');
        t.setAttribute('font-weight', '800');
      });

      // Set font-family inline on HTML elements inside foreignObject that use 'font-title'
      clonedSvg.querySelectorAll<HTMLElement>('foreignObject .font-title').forEach(el => {
        el.setAttribute('style', `${el.getAttribute('style') || ''}; font-family: ${formationFont.value}, sans-serif;`);
      });
      // And ensure 'font-subtitle' inside foreignObject uses Sen as well
      clonedSvg.querySelectorAll<HTMLElement>('foreignObject .font-subtitle').forEach(el => {
        el.setAttribute('style', `${el.getAttribute('style') || ''}; font-family: Sen, sans-serif;`);
      });
    } catch (e) {
      // noop
    }

    // Inline external images (icons and noise) to avoid CORS tainting
    try {
      // Generic: inline any <image> element inside the SVG
      const svgImages = clonedSvg.querySelectorAll('image');
      for (const img of Array.from(svgImages)) {
        const href = img.getAttribute('href') || img.getAttribute('xlink:href');
        if (href && !href.startsWith('data:')) {
          try {
            const data = await toDataUrl(href);
            img.setAttribute('href', data);
            img.removeAttribute('xlink:href');
            DEBUG && console.log('[export] inlined <image> href:', href);
          } catch {
            DEBUG && console.warn('[export] failed to inline <image> href:', href);
          }
        }
        // Be explicit about CORS on SVG images (harmless for data: URIs)
        (img as any).setAttribute?.('crossorigin', 'anonymous');
      }

      // Inline noise.png in pattern
      const noiseImgs = clonedSvg.querySelectorAll('pattern[id^="noisePattern"] image');
      for (const noiseImg of Array.from(noiseImgs)) {
        const href = noiseImg.getAttribute('href') || noiseImg.getAttribute('xlink:href');
        if (href && !href.startsWith('data:')) {
          try {
            const data = await toDataUrl(href);
            noiseImg.setAttribute('href', data);
            noiseImg.removeAttribute('xlink:href');
            DEBUG && console.log('[export] inlined noise image:', href);
          } catch (e) {
            DEBUG && console.warn('[export] failed to inline noise image:', href, e);
          }
        }
      }

      // Inline icons inside foreignObject (calendar.svg, location.svg)
      const htmlImgs = clonedSvg.querySelectorAll('foreignObject img');
      for (const img of Array.from(htmlImgs)) {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('data:')) {
          try {
            const data = await toDataUrl(src);
            img.setAttribute('src', data);
            DEBUG && console.log('[export] inlined foreignObject <img> src:', src);
          } catch {
            DEBUG && console.warn('[export] failed to inline foreignObject <img> src:', src);
          }
        }
      }

      // Inline background image if it's still a relative URL (when using URL via upload it's already data URL)
      const bgImgs = clonedSvg.querySelectorAll('pattern[id^="backgroundPattern"] image');
      for (const bgImg of Array.from(bgImgs)) {
        const href = bgImg.getAttribute('href') || bgImg.getAttribute('xlink:href');
        if (href && !href.startsWith('data:') && href.trim() !== '') {
          try {
            const data = await toDataUrl(href);
            bgImg.setAttribute('href', data);
            bgImg.removeAttribute('xlink:href');
            DEBUG && console.log('[export] inlined background image:', href);
          } catch {
            DEBUG && console.warn('[export] failed to inline background image:', href);
          }
        }
      }
    } catch (e) {
      // Best effort; continue
      DEBUG && console.warn('[export] error while inlining images:', e);
    }

    DEBUG && console.log('[export] external refs after inline:', listExternalRefs(clonedSvg));

    // Inline the selected Solidaires font and the Sen font into the SVG via @font-face to avoid external fetches during render
    try {
      const fontMap: Record<string, string> = {
        'Solidaires Boum': '/Solidaire-Boum.otf',
        'Solidaires Action': '/Solidaire-Action.otf',
        'Solidaires Cortege': '/Solidaire-Cortege.otf',
        'Solidaires Manif': '/Solidaire-Manif.otf',
      };
      const embedFont = async (fontFamily: string, url: string, format: string, weight: string = 'normal') => {
        DEBUG && console.log('[export] embedding font:', fontFamily, url);
        const res = await fetch(url);
        const blob = await res.blob();
        const dataUrl: string = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        styleEl.textContent = `@font-face { font-family: "${fontFamily}"; src: url(${dataUrl}) format('${format}'); font-weight: ${weight}; font-style: normal; font-display: swap; }`;
        clonedSvg.insertBefore(styleEl, clonedSvg.firstChild);
      };

      const titleFontUrl = fontMap[formationFont.value];
      if (titleFontUrl) await embedFont(formationFont.value, titleFontUrl, 'opentype', '900');

      // Always embed Sen as it's used for subtitles and meta info
      await embedFont('Sen', '/Sen.ttf', 'truetype', '800');
    } catch (e) {
      // Ignore font embedding errors
      DEBUG && console.warn('[export] font embedding failed:', e);
    }

    // Serialize the cloned SVG
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);

    // Create an image from the SVG string
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    // Hint the browser to allow same-origin rendering
    img.crossOrigin = 'anonymous';
    const primaryCanvas = document.createElement('canvas');
    const width = 1080;
    const height = 1350;
    primaryCanvas.width = width;
    primaryCanvas.height = height;
    const ctx = primaryCanvas.getContext('2d');
    if (!ctx) {
      URL.revokeObjectURL(url);
      return;
    }

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        try {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          // Early taint check
          try {
            ctx.getImageData(0, 0, 1, 1);
            DEBUG && console.log('[export] canvas looks clean after draw');
          } catch (e) {
            DEBUG && console.warn('[export] canvas tainted immediately after drawImage:', e);
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = reject;
      img.src = url;
    });

    // Export canvas to PNG and download
    let blob: Blob | null = null;
    try {
      blob = await new Promise((resolve, reject) =>
        primaryCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))), 'image/png')
      );
    } catch (e) {
      DEBUG && console.error('[export] toBlob failed (canvas likely tainted):', e);
      // Attempt fallback without foreignObject (some engines taint with FO even when data-URIs)
      try {
        URL.revokeObjectURL(url);
      } catch {}

      try {
        const fallbackSvg = clonedSvg.cloneNode(true) as SVGSVGElement;
        fallbackSvg.querySelectorAll('foreignObject').forEach((n) => n.parentNode?.removeChild(n));
        const serializer2 = new XMLSerializer();
        const svgString2 = serializer2.serializeToString(fallbackSvg);
        const svgBlob2 = new Blob([svgString2], { type: 'image/svg+xml;charset=utf-8' });
        const url2 = URL.createObjectURL(svgBlob2);
        const fallbackCanvas = document.createElement('canvas');
        fallbackCanvas.width = width;
        fallbackCanvas.height = height;
        const fallbackCtx = fallbackCanvas.getContext('2d');
        if (!fallbackCtx) {
          DEBUG && console.warn('[export] fallback canvas context unavailable');
          URL.revokeObjectURL(url2);
          throw new Error('fallback canvas ctx null');
        }
        await new Promise<void>((resolve, reject) => {
          const img2 = new Image();
          img2.crossOrigin = 'anonymous';
          img2.onload = () => {
            try {
              fallbackCtx.clearRect(0, 0, width, height);
              fallbackCtx.drawImage(img2, 0, 0, width, height);
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          img2.onerror = reject;
          img2.src = url2;
        });
        // Try export again
        blob = await new Promise((resolve, reject) =>
          fallbackCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob returned null (fallback)'))), 'image/png')
        );
        DEBUG && console.warn('[export] fallback export without foreignObject succeeded');
        try { URL.revokeObjectURL(url2); } catch {}
      } catch (e2) {
        DEBUG && console.error('[export] fallback export without foreignObject failed:', e2);
      }
    }

    try { URL.revokeObjectURL(url); } catch {}
    if (!blob) return;

    const a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  };

  const fileBase = formationName.value?.trim() || 'post-instagram';
  const baseName = fileBase.replace(/\s+/g, '-').toLowerCase();

  await downloadSvgAsPng(svgRef.value!, `${baseName}-main.png`);
  await downloadSvgAsPng(svgRef2.value!, `${baseName}-description.png`);

  isDownloading.value = false;
};

const copyWhatsappMessage = async () => {
  copyFeedback.value = true;
  const parts = [
    '*Causerie Solidaires Étudiant·e·s 33* 🪧💥',
    '',
    `Nous organisons cette semaine une causerie sur le thème *${formationName.value || 'NOM DE LA FORMATION'}*.`,
    '',
    formationDescription.value || 'Description de la formation',
    '',
    `📅 *${formattedLongDateTime.value || 'Date et heure'}*`,
    `📍 *${formationLocation.value || 'Lieu de la formation'}*`,
    '',
    "Comme chaque semaine, cet évènement est ouvert à toutes et tous, n'hésitez pas à venir !",
  ];
  const message = parts.join('\n');

  try {
    await navigator.clipboard.writeText(message);
    await new Promise(resolve => setTimeout(resolve, 2000));
    copyFeedback.value = false;
    // Optionally show a success message
  } catch (e) {
    // Optionally show an error message
  }
};
</script>

<style>
@font-face {
  font-family: 'Solidaires Boum';
  src: url('/Solidaire-Boum.otf');
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Solidaires Action';
  src: url('/Solidaire-Action.otf');
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Solidaires Cortege';
  src: url('/Solidaire-Cortege.otf');
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Solidaires Manif';
  src: url('/Solidaire-Manif.otf');
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Sen';
  src: url('/Sen.ttf');
  font-style: normal;
  font-display: swap;
}

:root {
  --font-title: 'Solidaires Boum';
}

.font-title {
  font-family: var(--font-title), sans-serif;
  font-weight: 900;
}

.font-subtitle {
  font-family: 'Sen', sans-serif;
  font-weight: 800;
  color: white;
}
</style>

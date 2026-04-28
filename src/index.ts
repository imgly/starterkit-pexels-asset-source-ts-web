/**
 * CE.SDK Pexels Image Editor Starterkit - Main Entry Point
 *
 * A design editor with Pexels stock photos integrated as the primary image source.
 * Search and browse millions of free stock photos from Pexels directly within the editor.
 *
 * @see https://img.ly/docs/cesdk/js/getting-started/
 * @see https://www.pexels.com/api/documentation/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import { initPexelsImageEditor } from './imgly';
import { resolveAssetPath } from './imgly/resolveAssetPath';

// ============================================================================
// Configuration
// ============================================================================

const config = {
  userId: 'starterkit-pexels-asset-source-user'

  // Local assets (uncomment and set path for self-hosted assets)
  // baseURL: `/assets/`,

  // License key (required for production)
  // license: 'YOUR_LICENSE_KEY',
};

// ============================================================================
// Pexels Configuration
// ============================================================================

// Your Pexels API key
// Get your API key from: https://www.pexels.com/api/
const pexelsConfig = {
  pexelsApiKey: undefined as string | undefined
  // pexelsApiKey: 'YOUR_PEXELS_API_KEY'
};

// ============================================================================
// Initialize Pexels Image Editor
// ============================================================================

CreativeEditorSDK.create('#cesdk_container', config)
  .then(async (cesdk) => {
    // Debug access (remove in production)
    (window as any).cesdk = cesdk;

    // Initialize the editor with Pexels integration
    await initPexelsImageEditor(cesdk, pexelsConfig);
    // ============================================================================
    // Scene Loading
    // ============================================================================

    // Load the Pexels demo scene from CDN
    // This scene showcases images that can be replaced with photos from Pexels
    await cesdk.loadFromURL(resolveAssetPath('/assets/pexels.scene'));
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize CE.SDK:', error);
  });

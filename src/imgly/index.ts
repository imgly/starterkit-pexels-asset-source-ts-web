/**
 * CE.SDK Pexels Image Editor - Initialization Module
 *
 * This module provides the main entry point for initializing the design editor
 * with Pexels stock photos integration. Import and call `initPexelsImageEditor()`
 * to configure a CE.SDK instance with Pexels as the primary image source.
 *
 * @see https://img.ly/docs/cesdk/js/custom-asset-sources/
 * @see https://www.pexels.com/api/documentation/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import {
  BlurAssetSource,
  ColorPaletteAssetSource,
  CropPresetsAssetSource,
  DemoAssetSources,
  EffectsAssetSource,
  FiltersAssetSource,
  PagePresetsAssetSource,
  StickerAssetSource,
  TextAssetSource,
  TextComponentAssetSource,
  TypefaceAssetSource,
  UploadAssetSources,
  VectorShapeAssetSource
} from '@cesdk/cesdk-js/plugins';

// Configuration plugin
import { DesignEditorConfig } from './config/plugin';

// Pexels plugin
import { PexelsAssetSourcePlugin } from './plugins/pexels';

// Re-export for external use
export { DesignEditorConfig } from './config/plugin';
export { PexelsAssetSourcePlugin } from './plugins/pexels';
export type { PexelsAssetSourcePluginOptions } from './plugins/pexels';

/**
 * Initialize the CE.SDK Pexels Image Editor with a complete configuration.
 *
 * This function configures a CE.SDK instance with:
 * - Design editor UI configuration
 * - Pexels stock photos as the primary image source
 * - Asset source plugins (templates, images, shapes, text, etc.)
 * - Actions dropdown in navigation bar
 * - Disabled placeholder and preview features
 *
 * @param cesdk - The CreativeEditorSDK instance to configure
 * @param options - Optional configuration
 * @param options.pexelsApiKey - Your Pexels API key (can also be set via VITE_PEXELS_API_KEY env var)
 */
export async function initPexelsImageEditor(
  cesdk: CreativeEditorSDK,
  options?: { pexelsApiKey?: string }
) {
  // ============================================================================
  // Configuration Plugin
  // ============================================================================

  // Add the design editor configuration plugin
  // This sets up the UI, features, settings, and i18n for design editing
  await cesdk.addPlugin(new DesignEditorConfig());

  // ============================================================================
  // Theme and Locale
  // ============================================================================

  // Configure appearance: 'light' | 'dark' | 'system'
  // cesdk.setTheme('dark');
  // cesdk.setLocale('en');

  // ============================================================================
  // Asset Source Plugins
  // ============================================================================

  // Asset source plugins provide built-in asset libraries

  // Blur presets for blur effects
  await cesdk.addPlugin(new BlurAssetSource());

  // Color palettes for design
  await cesdk.addPlugin(new ColorPaletteAssetSource());

  // Crop presets (aspect ratios)
  await cesdk.addPlugin(new CropPresetsAssetSource());

  // Local upload sources (images)
  await cesdk.addPlugin(
    new UploadAssetSources({
      include: ['ly.img.image.upload']
    })
  );

  // Demo assets (templates only - images will come from Pexels)
  await cesdk.addPlugin(
    new DemoAssetSources({
      include: [
        'ly.img.templates.blank.*',
        'ly.img.templates.presentation.*',
        'ly.img.templates.print.*',
        'ly.img.templates.social.*'
      ]
    })
  );

  // Visual effects (adjustments, vignette, etc.)
  await cesdk.addPlugin(new EffectsAssetSource());

  // Photo filters (LUT, duotone)
  await cesdk.addPlugin(new FiltersAssetSource());

  // Page format presets (A4, Letter, social media sizes)
  await cesdk.addPlugin(new PagePresetsAssetSource());

  // Sticker assets
  await cesdk.addPlugin(new StickerAssetSource());

  // Text presets (headlines, body text styles)
  await cesdk.addPlugin(new TextAssetSource());

  // Text components (pre-designed text layouts)
  await cesdk.addPlugin(new TextComponentAssetSource());

  // Typeface/font assets
  await cesdk.addPlugin(new TypefaceAssetSource());

  // Vector shapes (rectangles, circles, arrows, etc.)
  await cesdk.addPlugin(new VectorShapeAssetSource());

  // ============================================================================
  // Pexels Asset Source Plugin
  // ============================================================================

  // Setup Pexels as the primary image source
  // This replaces the default image library with Pexels stock photos
  await cesdk.addPlugin(
    new PexelsAssetSourcePlugin({ apiKey: options?.pexelsApiKey })
  );

  // ============================================================================
  // Feature Configuration
  // ============================================================================

  // Disable placeholder and preview features
  cesdk.feature.set('ly.img.placeholder', false);
  cesdk.feature.set('ly.img.preview', false);

  // ============================================================================
  // Editor Settings
  // ============================================================================

  // Hide page titles
  cesdk.engine.editor.setSetting('page/title/show', false);

  // ============================================================================
  // Navigation Bar Actions
  // ============================================================================

  // Configure the actions dropdown in the navigation bar
  cesdk.ui.insertOrderComponent(
    { in: 'ly.img.navigation.bar', position: 'end' },
    {
      id: 'ly.img.actions.navigationBar',
      children: [
        'ly.img.saveScene.navigationBar',
        'ly.img.exportImage.navigationBar',
        'ly.img.exportPDF.navigationBar',
        'ly.img.exportScene.navigationBar',
        'ly.img.exportArchive.navigationBar',
        'ly.img.importScene.navigationBar',
        'ly.img.importArchive.navigationBar'
      ]
    }
  );

  // ============================================================================
  // Scene Loading
  // ============================================================================

  // Load the Pexels demo scene from CDN
  // This scene showcases images that can be replaced with photos from Pexels
  await cesdk.loadFromURL(
    'https://img.ly/showcases/cesdk/cases/pexels-image-assets/pexels.scene'
  );
}

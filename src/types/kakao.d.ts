export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      class Map {
        constructor(container: HTMLElement, options: MapOptions);
        panTo(latlng: LatLng): void;
      }

      interface MapOptions {
        center: LatLng;
        level?: number;
      }


      class Marker {
        constructor(options?: MarkerOptions);
        setMap(map: Map | null): void;
        setPosition(latlng: LatLng): void;
      }
      
      interface MarkerOptions {
        position?: LatLng;
        map?: Map;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        getLat(): number;
        getLng(): number;
      }

      namespace event {
        function addListener(
          target: Map | Marker,
          type: 'click' | string,
          callback: (event: MouseEvent) => void
        ): void;
      }

      interface MouseEvent {
        latLng: LatLng;
      }
    }
  }
}
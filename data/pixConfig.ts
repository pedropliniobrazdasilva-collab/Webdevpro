// data/pixConfig.ts

interface PixConfig {
  pixKey: string;
  pixQrCodeUrl: string;
}

type PlanId = 'basico' | 'intermediario' | 'avancado';
type HostingId = 'basica' | 'intermediaria' | 'avancada';

const pixConfigs: Record<`${PlanId}-${HostingId}`, PixConfig> = {
  'basico-basica': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb30520400005303986540561.705802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304BA72',
    pixQrCodeUrl: 'https://i.postimg.cc/cHmTD7GK/IMG-20251116-WA0001.jpg'
  },
  'basico-intermediaria': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb30520400005303986540581.305802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304B353',
    pixQrCodeUrl: 'https://i.postimg.cc/bwy6tF7n/IMG-20251116-WA0004.jpg'
  },
  'basico-avancada': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406108.295802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***63040CC0',
    pixQrCodeUrl: 'https://i.postimg.cc/50GfTzVC/IMG-20251116-WA0005-2.jpg'
  },
  'intermediario-basica': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb30520400005303986540595.805802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304E02C',
    pixQrCodeUrl: 'https://i.postimg.cc/q7LNxykj/IMG-20251116-WA0009.jpg'
  },
  'intermediario-intermediaria': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406115.405802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304CDC7',
    pixQrCodeUrl: 'https://i.postimg.cc/4NDPDkpP/IMG-20251116-WA0010.jpg'
  },
  'intermediario-avancada': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406142.395802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304BB22',
    pixQrCodeUrl: 'https://i.postimg.cc/KvhS5VR8/IMG-20251116-WA0011.jpg'
  },
  'avancado-basica': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406115.905802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304A7C9',
    pixQrCodeUrl: 'https://i.postimg.cc/G3yxk3Bg/IMG-20251116-WA0012.jpg'
  },
  'avancado-intermediaria': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406135.505802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***6304477D',
    pixQrCodeUrl: 'https://i.ibb.co/m5htxTTD/IMG-20251116-WA0013.jpg'
  },
  'avancado-avancada': {
    pixKey: '00020101021126580014br.gov.bcb.pix01365d7e689c-126a-46ce-8705-092fa95efb305204000053039865406162.495802BR5918PEDRO P B DA SILVA6013FRANCISCO MOR62070503***63043971',
    pixQrCodeUrl: 'https://i.ibb.co/jvVmgN03/IMG-20251116-WA0014.jpg'
  }
};

/**
 * Retrieves PIX configuration for a given plan and hosting combination.
 * @param planId The ID of the site plan ('basico', 'intermediario', 'avancado').
 * @param hostingId The ID of the hosting plan ('basica', 'intermediaria', 'avancada').
 * @returns The PixConfig object or null if not found.
 */
export const getPixConfig = (planId: PlanId, hostingId: HostingId): PixConfig | null => {
  const key = `${planId}-${hostingId}` as const;
  return pixConfigs[key] || null;
};

/**
 * Checks if a given plan and hosting combination is eligible for PIX payment.
 * @param planId The ID of the site plan.
 * @param hostingId The ID of the hosting plan.
 * @returns True if PIX is available, false otherwise.
 */
export const canPayWithPix = (planId: PlanId, hostingId: HostingId): boolean => {
  const key = `${planId}-${hostingId}` as const;
  return key in pixConfigs;
};

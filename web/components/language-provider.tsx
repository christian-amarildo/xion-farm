"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Cookies from "js-cookie"

type Language = "en" | "pt"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.features": "Features",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.marketplace": "Marketplace",
    "nav.investments": "Investments",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    "nav.theme": "Toggle Theme",
    "nav.theme.dark": "Dark Mode",
    "nav.theme.light": "Light Mode",

    // Hero section
    "hero.title": "Revolutionizing Agriculture with Blockchain",
    "hero.subtitle": "Connecting farmers, consumers and investors through transparent and sustainable technology",
    "hero.cta": "Get Started",
    "hero.secondary": "Learn More",

    // Features section
    "features.title": "Why Choose XionFarm",
    "features.blockchain.title": "Blockchain Technology",
    "features.blockchain.description": "Secure, transparent transactions with no gas fees using XION blockchain",
    "features.ai.title": "AI-Powered Insights",
    "features.ai.description": "Predictive analytics for pricing, production optimization and early pest detection",
    "features.smart.title": "Smart Contracts",
    "features.smart.description": "Automated transactions and contractual guarantees for all parties",
    "features.gamification.title": "Gamification System",
    "features.gamification.description": "Earn rewards for sustainable farming practices and transparent transactions",

    // About section
    "about.title": "About XionFarm",
    "about.description":
      "XionFarm is an innovative platform that connects small and medium farmers directly with consumers, retailers and investors. By eliminating intermediaries and using blockchain technology, we ensure fair pricing, transparency and sustainability throughout the agricultural supply chain.",
    "about.mission":
      "Our mission is to create a more equitable, efficient and environmentally responsible agricultural ecosystem.",
    "about.vision.title": "Our Vision",
    "about.vision.description":
      "To transform agriculture through technology, creating a more sustainable, transparent, and profitable industry for all stakeholders.",
    "about.story.title": "Our Story",
    "about.story.description":
      "XionFarm was founded in 2023 by a team of agricultural experts, blockchain developers, and sustainability advocates who recognized the need for innovation in the agricultural sector.",
    "about.team.title": "Our Team",
    "about.team.description":
      "We are a diverse team of experts committed to revolutionizing agriculture through technology.",
    "about.values.title": "Our Values",
    "about.values.transparency": "Transparency",
    "about.values.transparency.description":
      "We believe in complete transparency across the agricultural supply chain.",
    "about.values.sustainability": "Sustainability",
    "about.values.sustainability.description": "We are committed to promoting sustainable farming practices.",
    "about.values.innovation": "Innovation",
    "about.values.innovation.description": "We continuously innovate to solve agricultural challenges.",
    "about.values.fairness": "Fairness",
    "about.values.fairness.description": "We ensure fair compensation for all participants in the ecosystem.",

    // Stakeholders section
    "stakeholders.title": "Who Benefits",
    "stakeholders.farmers.title": "Farmers",
    "stakeholders.farmers.description":
      "Maximize revenue by eliminating intermediaries and gain easier access to credit",
    "stakeholders.consumers.title": "Consumers & Retailers",
    "stakeholders.consumers.description": "Transparency in product origin and blockchain-based quality control",
    "stakeholders.investors.title": "Investors",
    "stakeholders.investors.description": "New class of digital assets linked to physical commodities",
    "stakeholders.regulators.title": "Regulators",
    "stakeholders.regulators.description": "Enhanced monitoring of production flows and automated fiscal compliance",

    // Sustainability section
    "sustainability.title": "Commitment to Sustainability",
    "sustainability.description":
      "XionFarm is aligned with the UN Sustainable Development Goals (SDGs), promoting sustainable agriculture, economic growth, innovation, responsible consumption and climate action.",
    "sustainability.sdg2": "Zero Hunger & Sustainable Agriculture",
    "sustainability.sdg8": "Decent Work & Economic Growth",
    "sustainability.sdg9": "Industry, Innovation & Infrastructure",
    "sustainability.sdg12": "Responsible Consumption & Production",
    "sustainability.sdg13": "Climate Action",

    // CTA section
    "cta.title": "Ready to Join the Agricultural Revolution?",
    "cta.description": "Start selling, buying or investing in sustainable agriculture today.",
    "cta.button": "Join XionFarm",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Auth pages
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.name": "Full Name",
    "auth.role": "I am a",
    "auth.farmer": "Farmer",
    "auth.consumer": "Consumer/Retailer",
    "auth.investor": "Investor",
    "auth.forgotPassword": "Forgot Password?",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.createAccount": "Create Account",
    "auth.loginNow": "Login Now",

    // Dashboard
    "dashboard.welcome": "Welcome to your Dashboard",
    "dashboard.overview": "Overview",
    "dashboard.products": "Products",
    "dashboard.transactions": "Transactions",
    "dashboard.analytics": "Analytics",
    "dashboard.settings": "Settings",
    "dashboard.addProduct": "Add Product",
    "dashboard.viewAll": "View All",

    // Marketplace
    "marketplace.title": "Marketplace",
    "marketplace.search": "Search products...",
    "marketplace.filter": "Filter",
    "marketplace.sort": "Sort by",
    "marketplace.category": "Category",
    "marketplace.price": "Price",
    "marketplace.location": "Location",
    "marketplace.certification": "Certification",
    "marketplace.addToCart": "Add to Cart",
    "marketplace.viewDetails": "View Details",

    // Product
    "product.price": "Price",
    "product.quantity": "Quantity",
    "product.location": "Location",
    "product.farmer": "Farmer",
    "product.certification": "Certification",
    "product.description": "Description",
    "product.harvest": "Harvest Date",
    "product.available": "Available Quantity",
    "product.buy": "Buy Now",
    "product.invest": "Invest",

    // Profile
    "profile.title": "Profile",
    "profile.personalInfo": "Personal Information",
    "profile.updateProfile": "Update Profile",
    "profile.changePassword": "Change Password",
    "profile.notifications": "Notifications",
    "profile.paymentMethods": "Payment Methods",
    "profile.addPayment": "Add Payment Method",

    // Errors and messages
    "error.required": "This field is required",
    "error.email": "Please enter a valid email",
    "error.password": "Password must be at least 8 characters",
    "error.passwordMatch": "Passwords do not match",
    "success.login": "Login successful",
    "success.signup": "Account created successfully",
    "success.productAdded": "Product added successfully",
    "success.orderPlaced": "Order placed successfully",

    // Features page
    "features.page.title": "Our Features",
    "features.page.subtitle": "Discover how XionFarm is revolutionizing agriculture",
    "features.page.blockchain.title": "Blockchain Technology",
    "features.page.blockchain.description":
      "Our platform leverages blockchain technology to create a transparent, secure, and efficient agricultural ecosystem. With zero gas fees using the XION blockchain, we ensure that transactions are cost-effective for all participants.",
    "features.page.ai.title": "AI-Powered Insights",
    "features.page.ai.description":
      "Our advanced AI algorithms analyze vast amounts of data to provide actionable insights for farmers, consumers, and investors. From predictive pricing to early pest detection, our AI tools help optimize agricultural operations.",
    "features.page.smart.title": "Smart Contracts",
    "features.page.smart.description":
      "Smart contracts automate transactions and ensure that all parties fulfill their obligations. This reduces the need for intermediaries and creates a more efficient and trustworthy marketplace.",
    "features.page.gamification.title": "Gamification System",
    "features.page.gamification.description":
      "Our unique gamification system rewards sustainable farming practices and transparent transactions. Earn points, badges, and real benefits for contributing to a more sustainable agricultural ecosystem.",
    "features.page.tokenization.title": "Asset Tokenization",
    "features.page.tokenization.description":
      "Convert agricultural assets into digital tokens for fractional ownership and trading. This opens up new investment opportunities and increases liquidity in the agricultural market.",
    "features.page.marketplace.title": "Global Marketplace",
    "features.page.marketplace.description":
      "Connect with buyers and sellers from around the world on our secure and transparent marketplace. Find the best products and prices without intermediaries.",
    "features.page.investment.title": "Investment Opportunities",
    "features.page.investment.description":
      "Discover and invest in sustainable agricultural projects with transparent returns and impact metrics. Support farmers while earning competitive returns.",
    "features.page.traceability.title": "Complete Traceability",
    "features.page.traceability.description":
      "Track products from farm to table with our blockchain-based traceability system. Verify the origin, quality, and sustainability of agricultural products.",

    // Contact page
    "contact.title": "Contact Us",
    "contact.subtitle": "We'd love to hear from you",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.info.title": "Get in Touch",
    "contact.info.description": "Have questions about XionFarm? Our team is here to help.",
    "contact.info.email": "Email",
    "contact.info.phone": "Phone",
    "contact.info.address": "Address",
    "contact.info.hours": "Business Hours",
    "contact.faq.title": "Frequently Asked Questions",
    "contact.faq.q1": "How do I get started with XionFarm?",
    "contact.faq.a1":
      "Simply sign up for an account, complete your profile, and you can start buying, selling, or investing in agricultural products.",
    "contact.faq.q2": "Is XionFarm available worldwide?",
    "contact.faq.a2":
      "Yes, XionFarm is a global platform. However, some features may be limited in certain regions due to regulatory requirements.",
    "contact.faq.q3": "How does the blockchain verification work?",
    "contact.faq.a3":
      "Our platform uses the XION blockchain to verify and record all transactions, ensuring transparency and security throughout the supply chain.",
    "contact.faq.q4": "What fees does XionFarm charge?",
    "contact.faq.a4":
      "XionFarm charges minimal fees for transactions and investments. There are no gas fees for blockchain transactions.",
    "contact.success": "Thank you for your message. We'll get back to you soon!",
  },
  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.features": "Recursos",
    "nav.contact": "Contato",
    "nav.login": "Entrar",
    "nav.signup": "Cadastrar",
    "nav.dashboard": "Painel",
    "nav.marketplace": "Mercado",
    "nav.investments": "Investimentos",
    "nav.profile": "Perfil",
    "nav.logout": "Sair",
    "nav.theme": "Alternar Tema",
    "nav.theme.dark": "Modo Escuro",
    "nav.theme.light": "Modo Claro",

    // Hero section
    "hero.title": "Revolucionando a Agricultura com Blockchain",
    "hero.subtitle":
      "Conectando agricultores, consumidores e investidores através de tecnologia transparente e sustentável",
    "hero.cta": "Começar Agora",
    "hero.secondary": "Saiba Mais",

    // Features section
    "features.title": "Por que Escolher a XionFarm",
    "features.blockchain.title": "Tecnologia Blockchain",
    "features.blockchain.description": "Transações seguras e transparentes sem taxas de gás usando blockchain XION",
    "features.ai.title": "Insights com IA",
    "features.ai.description":
      "Análises preditivas para precificação, otimização da produção e detecção precoce de pragas",
    "features.smart.title": "Contratos Inteligentes",
    "features.smart.description": "Transações automatizadas e garantias contratuais para todas as partes",
    "features.gamification.title": "Sistema de Gamificação",
    "features.gamification.description":
      "Ganhe recompensas por práticas agrícolas sustentáveis e transações transparentes",

    // About section
    "about.title": "Sobre a XionFarm",
    "about.description":
      "A XionFarm é uma plataforma inovadora que conecta pequenos e médios agricultores diretamente com consumidores, varejistas e investidores. Ao eliminar intermediários e usar tecnologia blockchain, garantimos preços justos, transparência e sustentabilidade em toda a cadeia de suprimentos agrícola.",
    "about.mission":
      "Nossa missão é criar um ecossistema agrícola mais equitativo, eficiente e ambientalmente responsável.",
    "about.vision.title": "Nossa Visão",
    "about.vision.description":
      "Transformar a agricultura através da tecnologia, criando uma indústria mais sustentável, transparente e lucrativa para todos os participantes.",
    "about.story.title": "Nossa História",
    "about.story.description":
      "A XionFarm foi fundada em 2023 por uma equipe de especialistas em agricultura, desenvolvedores de blockchain e defensores da sustentabilidade que reconheceram a necessidade de inovação no setor agrícola.",
    "about.team.title": "Nossa Equipe",
    "about.team.description":
      "Somos uma equipe diversificada de especialistas comprometidos em revolucionar a agricultura através da tecnologia.",
    "about.values.title": "Nossos Valores",
    "about.values.transparency": "Transparência",
    "about.values.transparency.description":
      "Acreditamos na transparência completa em toda a cadeia de suprimentos agrícola.",
    "about.values.sustainability": "Sustentabilidade",
    "about.values.sustainability.description": "Estamos comprometidos em promover práticas agrícolas sustentáveis.",
    "about.values.innovation": "Inovação",
    "about.values.innovation.description": "Inovamos continuamente para resolver desafios agrícolas.",
    "about.values.fairness": "Justiça",
    "about.values.fairness.description": "Garantimos compensação justa para todos os participantes do ecossistema.",

    // Stakeholders section
    "stakeholders.title": "Quem se Beneficia",
    "stakeholders.farmers.title": "Agricultores",
    "stakeholders.farmers.description":
      "Maximizam a receita eliminando intermediários e obtêm acesso facilitado ao crédito",
    "stakeholders.consumers.title": "Consumidores e Varejistas",
    "stakeholders.consumers.description":
      "Transparência na origem dos produtos e controle de qualidade baseado em blockchain",
    "stakeholders.investors.title": "Investidores",
    "stakeholders.investors.description": "Nova classe de ativos digitais vinculados a commodities físicas",
    "stakeholders.regulators.title": "Reguladores",
    "stakeholders.regulators.description":
      "Monitoramento aprimorado dos fluxos de produção e conformidade fiscal automatizada",

    // Sustainability section
    "sustainability.title": "Compromisso com a Sustentabilidade",
    "sustainability.description":
      "A XionFarm está alinhada com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, promovendo agricultura sustentável, crescimento econômico, inovação, consumo responsável e ação climática.",
    "sustainability.sdg2": "Fome Zero e Agricultura Sustentável",
    "sustainability.sdg8": "Trabalho Decente e Crescimento Econômico",
    "sustainability.sdg9": "Indústria, Inovação e Infraestrutura",
    "sustainability.sdg12": "Consumo e Produção Responsáveis",
    "sustainability.sdg13": "Ação Climática",

    // CTA section
    "cta.title": "Pronto para Participar da Revolução Agrícola?",
    "cta.description": "Comece a vender, comprar ou investir em agricultura sustentável hoje.",
    "cta.button": "Junte-se à XionFarm",

    // Footer
    "footer.rights": "Todos os direitos reservados",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",

    // Auth pages
    "auth.login": "Entrar",
    "auth.signup": "Cadastrar",
    "auth.email": "Email",
    "auth.password": "Senha",
    "auth.confirmPassword": "Confirmar Senha",
    "auth.name": "Nome Completo",
    "auth.role": "Eu sou um",
    "auth.farmer": "Agricultor",
    "auth.consumer": "Consumidor/Varejista",
    "auth.investor": "Investidor",
    "auth.forgotPassword": "Esqueceu a Senha?",
    "auth.noAccount": "Não tem uma conta?",
    "auth.hasAccount": "Já tem uma conta?",
    "auth.createAccount": "Criar Conta",
    "auth.loginNow": "Entrar Agora",

    // Dashboard
    "dashboard.welcome": "Bem-vindo ao seu Painel",
    "dashboard.overview": "Visão Geral",
    "dashboard.products": "Produtos",
    "dashboard.transactions": "Transações",
    "dashboard.analytics": "Análises",
    "dashboard.settings": "Configurações",
    "dashboard.addProduct": "Adicionar Produto",
    "dashboard.viewAll": "Ver Todos",

    // Marketplace
    "marketplace.title": "Mercado",
    "marketplace.search": "Buscar produtos...",
    "marketplace.filter": "Filtrar",
    "marketplace.sort": "Ordenar por",
    "marketplace.category": "Categoria",
    "marketplace.price": "Preço",
    "marketplace.location": "Localização",
    "marketplace.certification": "Certificação",
    "marketplace.addToCart": "Adicionar ao Carrinho",
    "marketplace.viewDetails": "Ver Detalhes",

    // Product
    "product.price": "Preço",
    "product.quantity": "Quantidade",
    "product.location": "Localização",
    "product.farmer": "Agricultor",
    "product.certification": "Certificação",
    "product.description": "Descrição",
    "product.harvest": "Data da Colheita",
    "product.available": "Quantidade Disponível",
    "product.buy": "Comprar Agora",
    "product.invest": "Investir",

    // Profile
    "profile.title": "Perfil",
    "profile.personalInfo": "Informações Pessoais",
    "profile.updateProfile": "Atualizar Perfil",
    "profile.changePassword": "Alterar Senha",
    "profile.notifications": "Notificações",
    "profile.paymentMethods": "Métodos de Pagamento",
    "profile.addPayment": "Adicionar Método de Pagamento",

    // Errors and messages
    "error.required": "Este campo é obrigatório",
    "error.email": "Por favor, insira um email válido",
    "error.password": "A senha deve ter pelo menos 8 caracteres",
    "error.passwordMatch": "As senhas não coincidem",
    "success.login": "Login realizado com sucesso",
    "success.signup": "Conta criada com sucesso",
    "success.productAdded": "Produto adicionado com sucesso",
    "success.orderPlaced": "Pedido realizado com sucesso",

    // Features page
    "features.page.title": "Nossos Recursos",
    "features.page.subtitle": "Descubra como a XionFarm está revolucionando a agricultura",
    "features.page.blockchain.title": "Tecnologia Blockchain",
    "features.page.blockchain.description":
      "Nossa plataforma utiliza tecnologia blockchain para criar um ecossistema agrícola transparente, seguro e eficiente. Com zero taxas de gás usando o blockchain XION, garantimos que as transações sejam econômicas para todos os participantes.",
    "features.page.ai.title": "Insights com Inteligência Artificial",
    "features.page.ai.description":
      "Nossos avançados algoritmos de IA analisam grandes quantidades de dados para fornecer insights acionáveis para agricultores, consumidores e investidores. De previsão de preços à detecção precoce de pragas, nossas ferramentas de IA ajudam a otimizar operações agrícolas.",
    "features.page.smart.title": "Contratos Inteligentes",
    "features.page.smart.description":
      "Contratos inteligentes automatizam transações e garantem que todas as partes cumpram suas obrigações. Isso reduz a necessidade de intermediários e cria um mercado mais eficiente e confiável.",
    "features.page.gamification.title": "Sistema de Gamificação",
    "features.page.gamification.description":
      "Nosso sistema único de gamificação recompensa práticas agrícolas sustentáveis e transações transparentes. Ganhe pontos, distintivos e benefícios reais por contribuir para um ecossistema agrícola mais sustentável.",
    "features.page.tokenization.title": "Tokenização de Ativos",
    "features.page.tokenization.description":
      "Converta ativos agrícolas em tokens digitais para propriedade fracionada e negociação. Isso abre novas oportunidades de investimento e aumenta a liquidez no mercado agrícola.",
    "features.page.marketplace.title": "Mercado Global",
    "features.page.marketplace.description":
      "Conecte-se com compradores e vendedores de todo o mundo em nosso mercado seguro e transparente. Encontre os melhores produtos e preços sem intermediários.",
    "features.page.investment.title": "Oportunidades de Investimento",
    "features.page.investment.description":
      "Descubra e invista em projetos agrícolas sustentáveis com retornos transparentes e métricas de impacto. Apoie agricultores enquanto obtém retornos competitivos.",
    "features.page.traceability.title": "Rastreabilidade Completa",
    "features.page.traceability.description":
      "Acompanhe produtos da fazenda à mesa com nosso sistema de rastreabilidade baseado em blockchain. Verifique a origem, qualidade e sustentabilidade dos produtos agrícolas.",

    // Contact page
    "contact.title": "Entre em Contato",
    "contact.subtitle": "Adoraríamos ouvir de você",
    "contact.form.name": "Seu Nome",
    "contact.form.email": "Seu Email",
    "contact.form.subject": "Assunto",
    "contact.form.message": "Mensagem",
    "contact.form.submit": "Enviar Mensagem",
    "contact.info.title": "Fale Conosco",
    "contact.info.description": "Tem perguntas sobre a XionFarm? Nossa equipe está aqui para ajudar.",
    "contact.info.email": "Email",
    "contact.info.phone": "Telefone",
    "contact.info.address": "Endereço",
    "contact.info.hours": "Horário Comercial",
    "contact.faq.title": "Perguntas Frequentes",
    "contact.faq.q1": "Como começar com a XionFarm?",
    "contact.faq.a1":
      "Basta criar uma conta, completar seu perfil e você pode começar a comprar, vender ou investir em produtos agrícolas.",
    "contact.faq.q2": "A XionFarm está disponível mundialmente?",
    "contact.faq.a2":
      "Sim, a XionFarm é uma plataforma global. No entanto, alguns recursos podem ser limitados em certas regiões devido a requisitos regulatórios.",
    "contact.faq.q3": "Como funciona a verificação blockchain?",
    "contact.faq.a3":
      "Nossa plataforma usa o blockchain XION para verificar e registrar todas as transações, garantindo transparência e segurança em toda a cadeia de suprimentos.",
    "contact.faq.q4": "Quais taxas a XionFarm cobra?",
    "contact.faq.a4":
      "A XionFarm cobra taxas mínimas para transações e investimentos. Não há taxas de gás para transações blockchain.",
    "contact.success": "Obrigado pela sua mensagem. Entraremos em contato em breve!",
  },
}

const LANGUAGE_COOKIE_NAME = "xionfarm_language"
const LANGUAGE_COOKIE_EXPIRY = 365 // days

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Initialize language from cookie on mount
  useEffect(() => {
    const savedLanguage = Cookies.get(LANGUAGE_COOKIE_NAME) as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    Cookies.set(LANGUAGE_COOKIE_NAME, newLanguage, { expires: LANGUAGE_COOKIE_EXPIRY })
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


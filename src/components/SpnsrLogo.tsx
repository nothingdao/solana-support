// 📄 src/components/SpnsrLogo.tsx (Simplified Text-Only Version)

export const SpnsrLogo = ({
  size = "md",
  className = ""
}: {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}) => {
  const sizes = {
    sm: { text: "text-lg font-bold" },
    md: { text: "text-2xl font-bold" },
    lg: { text: "text-3xl font-bold" },
    xl: { text: "text-5xl font-bold" }
  }

  const sizeClasses = sizes[size]

  return (
    <div className={`${className}`}>
      <span className={`${sizeClasses.text} tracking-tight`}>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF]">
          s
        </span>
        <span className="text-foreground">pnsr</span>
      </span>
    </div>
  )
}

// Usage Examples Component (for testing)
export const LogoExamples = () => {
  return (
    <div className="p-8 space-y-8 bg-background">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">spnsr Logo Variations</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-8">
            <SpnsrLogo size="sm" />
            <SpnsrLogo size="md" />
            <SpnsrLogo size="lg" />
            <SpnsrLogo size="xl" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dark Background</h3>
        <div className="bg-black p-6 rounded-lg">
          <div className="flex items-center space-x-8">
            <SpnsrLogo size="md" />
            <SpnsrLogo size="lg" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Header Usage</h3>
        <div className="border-b pb-4">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <SpnsrLogo size="md" />
            <nav className="hidden md:flex items-center space-x-6">
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">Projects</span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer">Documentation</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Contexts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Small badge */}
          <div className="p-3 border rounded-lg text-center">
            <SpnsrLogo size="sm" />
            <p className="text-xs text-muted-foreground mt-2">Badge</p>
          </div>

          {/* Navigation */}
          <div className="p-3 border rounded-lg text-center">
            <SpnsrLogo size="md" />
            <p className="text-xs text-muted-foreground mt-2">Navigation</p>
          </div>

          {/* Hero */}
          <div className="p-3 border rounded-lg text-center">
            <SpnsrLogo size="lg" />
            <p className="text-xs text-muted-foreground mt-2">Hero</p>
          </div>

          {/* Landing */}
          <div className="p-3 border rounded-lg text-center">
            <SpnsrLogo size="xl" />
            <p className="text-xs text-muted-foreground mt-2">Landing</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Gradient Variations</h3>
        <div className="space-y-2">
          {/* Default Solana gradient */}
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF]">s</span>
            <span className="text-foreground">pnsr</span>
            <span className="text-xs text-muted-foreground ml-2">← Default</span>
          </div>

          {/* Alternative gradients for different themes */}
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">s</span>
            <span className="text-foreground">pnsr</span>
            <span className="text-xs text-muted-foreground ml-2">← Blue variant</span>
          </div>

          <div className="text-2xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">s</span>
            <span className="text-foreground">pnsr</span>
            <span className="text-xs text-muted-foreground ml-2">← Orange variant</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Custom Styling</h3>
        <div className="space-y-2">
          {/* Hover effect */}
          <div className="text-2xl font-bold tracking-tight cursor-pointer transition-all hover:scale-105">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF]">s</span>
            <span className="text-foreground">pnsr</span>
            <span className="text-xs text-muted-foreground ml-2">← Hover to scale</span>
          </div>

          {/* With underline */}
          <div className="text-2xl font-bold tracking-tight border-b-2 border-gradient-to-r from-[#00FFA3] to-[#DC1FFF] inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF]">s</span>
            <span className="text-foreground">pnsr</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced version with theme support
export const SpnsrLogoThemed = ({
  size = "md",
  theme = "default",
  className = ""
}: {
  size?: "sm" | "md" | "lg" | "xl"
  theme?: "default" | "blue" | "orange" | "purple"
  className?: string
}) => {
  const sizes = {
    sm: { text: "text-lg font-bold" },
    md: { text: "text-2xl font-bold" },
    lg: { text: "text-3xl font-bold" },
    xl: { text: "text-5xl font-bold" }
  }

  const themes = {
    default: "from-[#00FFA3] to-[#DC1FFF]", // Solana gradient
    blue: "from-blue-500 to-purple-600",
    orange: "from-orange-500 to-red-600",
    purple: "from-purple-500 to-pink-600"
  }

  const sizeClasses = sizes[size]
  const gradientClasses = themes[theme]

  return (
    <div className={className}>
      <span className={`${sizeClasses.text} tracking-tight`}>
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClasses}`}>
          s
        </span>
        <span className="text-foreground">pnsr</span>
      </span>
    </div>
  )
}

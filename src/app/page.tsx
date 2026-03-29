import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import {
  Sparkles,
  Camera,
  List,
  FileText,
  Palette,
  Zap,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pixel-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles size={14} />
            AI-Powered Pixel Art Patterns
          </div>
          <h1 className="font-heading text-4xl font-bold text-secondary sm:text-6xl lg:text-7xl">
            Create your own{" "}
            <span className="text-primary">Pixelhobby</span>
            <br />
            patterns with AI
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-400">
            Describe what you want or upload a photo. Our AI generates pixel art
            patterns perfectly mapped to Pixelhobby&apos;s 314 colors, with
            step-by-step instructions and materials lists.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/app/create">
              <Button size="lg">
                Start creating for free
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg">
                See how it works
                <ChevronDown size={18} className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Demo preview placeholder */}
          <div className="mx-auto mt-16 max-w-4xl">
            <Card className="overflow-hidden shadow-2xl shadow-primary/10">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12">
                <div className="grid grid-cols-12 gap-1">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-sm"
                      style={{
                        backgroundColor: `hsl(${(i * 15 + 20) % 360}, ${50 + (i % 3) * 15}%, ${55 + (i % 4) * 8}%)`,
                      }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-secondary-300">
                  Example pattern preview
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-secondary sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-center text-secondary-400">
            Three simple steps from idea to Pixelhobby project.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Describe or Upload",
                desc: "Type a description like 'a cute orange cat' or upload any photo. Choose your frame size and style.",
                icon: <Sparkles size={24} />,
              },
              {
                step: "2",
                title: "AI Generates",
                desc: "Our AI creates pixel art and maps every pixel to the nearest Pixelhobby color from the 314-color palette.",
                icon: <Palette size={24} />,
              },
              {
                step: "3",
                title: "Get Your Pattern",
                desc: "View your pattern with an interactive grid, materials list, and export as PDF to start crafting.",
                icon: <List size={24} />,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div className="mb-2 text-xs font-bold text-primary">
                  STEP {item.step}
                </div>
                <h3 className="font-heading text-xl font-semibold text-secondary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-secondary-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-secondary sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-3 text-center text-secondary-400">
            The only tool that combines AI generation with Pixelhobby compatibility.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Sparkles size={20} />,
                title: "AI Generation",
                desc: "Turn any text description into pixel art with AI — no drawing skills needed.",
              },
              {
                icon: <Camera size={20} />,
                title: "Photo Conversion",
                desc: "Upload any photo and convert it into a Pixelhobby-ready pattern.",
              },
              {
                icon: <Palette size={20} />,
                title: "314 Pixelhobby Colors",
                desc: "Every pixel is mapped to the exact Pixelhobby color palette using advanced color science.",
              },
              {
                icon: <List size={20} />,
                title: "Materials List",
                desc: "Know exactly how many pixel squares of each color you need, with cost estimates.",
              },
              {
                icon: <FileText size={20} />,
                title: "PDF Export",
                desc: "Print your pattern with color numbers and symbols, just like official Pixelhobby patterns.",
              },
              {
                icon: <Zap size={20} />,
                title: "Multiple Formats",
                desc: "From tiny keychains to mega 6x6 baseplate projects — we support all sizes.",
              },
            ].map((feature) => (
              <Card key={feature.title} hover className="p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-secondary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-secondary-400">
                  {feature.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to create your first pattern?
          </h2>
          <p className="mt-4 text-lg text-secondary-200">
            Start for free. No credit card required.
          </p>
          <Link href="/app/create" className="mt-8 inline-block">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-500 text-white"
            >
              Start creating now
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

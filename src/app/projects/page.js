import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projectcard";
import { FadeIn } from "@/components/ui/fade-in";
import { getProjects } from "@/lib/firebase/projects";
import { ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Complete Projects | Yunawise Techsolve LLP",
  description: "Explore the enterprise-grade applications, custom software development, e-commerce stores, and digital experiences engineered by our team.",
};

export const revalidate = 3600; // revalidate every hour

export default async function ProjectsPage({ searchParams }) {
    const params = await searchParams;
    const platformFilter = params.platform;

    let projects = await getProjects();

    const platforms = Array.from(
        new Set(
            projects
            .map((p) => p.platform_type)
            .filter(Boolean)
        )
    );

    if (platformFilter) {
        projects = projects.filter(
            (p) => p.platform_type === platformFilter
        );
    }

    return (
        <>
            <Navbar />
            <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />
            
            <main className="flex-grow reveal-container relative z-[1] pt-16 sm:pt-20 lg:pt-28 bg-slate-50/30">
                {/* Hero Section */}
                <section className="py-10 md:py-12 lg:py-16 bg-transparent relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <FadeIn delay={0.1} className="max-w-3xl mx-auto flex flex-col items-center">
                            <Link href="/" className="group inline-flex items-center text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full mb-8 hover:bg-purple-100 transition-colors">
                                <ArrowLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                                Back to Home
                            </Link>
                            
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6">
                                <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                                Our Portfolio
                            </span>

                            <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-[1.1] tracking-tight mb-6">
                                Completed <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">Client Projects</span>
                            </h1>
                            
                            <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                                Explore the high-performance applications, custom enterprise systems, and high-conversion e-commerce stores we've engineered.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* Filter and Grid Section */}
                <section className="pb-24 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        {/* Filters */}
                        <FadeIn delay={0.2} className="flex flex-wrap items-center justify-center gap-3 mb-16">
                            <Button
                                variant={!platformFilter ? "default" : "outline"}
                                className={`rounded-full h-11 px-6 transition-all duration-300 font-bold text-xs uppercase tracking-wider ${!platformFilter ? 'bg-purple-600 text-white shadow-md border-0 hover:bg-purple-700' : 'bg-white border-slate-200 text-slate-600 hover:text-purple-600'}`}
                                asChild
                            >
                                <Link href="/projects">All Work</Link>
                            </Button>
                            {platforms.map(platform => (
                                <Button
                                    key={String(platform)}
                                    variant={platformFilter === platform ? "default" : "outline"}
                                    className={`rounded-full h-11 px-6 transition-all duration-300 font-bold text-xs uppercase tracking-wider ${platformFilter === platform ? 'bg-purple-600 text-white shadow-md border-0 hover:bg-purple-700' : 'bg-white border-slate-200 text-slate-600 hover:text-purple-600'}`}
                                    asChild
                                >
                                    <Link href={`/projects?platform=${encodeURIComponent(String(platform))}`}>{String(platform)}</Link>
                                </Button>
                            ))}
                        </FadeIn>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects && projects.length > 0 ? (
                                projects.map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))
                            ) : (
                                <FadeIn delay={0.3} className="col-span-full py-24 text-center text-slate-400 border border-slate-200 rounded-3xl border-dashed bg-white shadow-sm flex flex-col items-center justify-center">
                                    <span className="text-lg font-medium">No projects found for the selected filter.</span>
                                </FadeIn>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

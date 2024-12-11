"use client"

import React, {useEffect, useState} from 'react';
import {ChevronRight, Download, List, Star} from 'lucide-react';
import {Template, TemplateFilters as Filters} from '@/types/template';
import {Button} from "@/components/ui/button"
import {SearchInput} from "@/components/ui/search-input";
import Link from "next/link";
import {useAuth} from "@/hooks/auth-provider";
import {CopyButton} from "@/components/ui/copy-button";
import {CreateTemplate} from "@/components/create-template";
import { TemplateApi } from '@/lib/api/template';

const MOCK_TEMPLATES: Template[] = [
    {
        id: '1',
        name: '@4513echo/fall-alacarte',
        description: 'A small collective (à la carte) library for Fall.vim',
        tags: ['vim', 'plugin', 'library'],
        author: '4513echo',
        isPrivate: false,
        createdAt: new Date(),
        downloads: 47,
    },
    {
        id: '2',
        name: '@stackblitz/vite-react',
        description: 'Official Vite + React template for StackBlitz',
        tags: ['react', 'vite', 'typescript'],
        author: 'StackBlitz',
        isPrivate: false,
        createdAt: new Date(),
        downloads: 1234,
    },
];

export default function Page() {
    const {user} = useAuth();
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<Filters>({
        search: '',
        tags: [],
        showPrivate: false,
    });

    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        TemplateApi.getTemplates().then((response) => {
            if (response.data) {
                setTemplates(response.data.data);
            }
        });
    }, []);


    const filteredTemplates = templates.filter((template) => {
        if (!filters.showPrivate && template.isPrivate) return false;

        if (
            search &&
            !template.name?.toLowerCase().includes(search.toLowerCase()) &&
            !template.description?.toLowerCase().includes(search.toLowerCase())
        ) {
            return false;
        }

        if (filters.tags.length > 0 && !filters.tags.some((tag) => template.tags.includes(tag))) {
            return false;
        }

        return true;
    });

    const handleSaveTemplate = (template: Template) => {
        console.log('Saving template:', template);
    };

    return (
        <div className="min-h-screen mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold ">Marketplace</h1>

                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm">
                            <Star className="h-4 w-4 mr-2"/>
                            Starred
                        </Button>
                        {user && (
                            <>
                                <Button variant="outline" size="sm">
                                    <List className="h-4 w-4 mr-2"/>
                                    My Templates
                                </Button>
                                <CreateTemplate/>
                            </>
                        )}
                    </div>
                </div>
                <div className="rounded-lg shadow">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <SearchInput
                                placeholder="Search templates..."
                                value={search}
                                onChange={(e: {
                                    target: { value: React.SetStateAction<string>; };
                                }) => setSearch(e.target.value)}
                                className="w-96"
                            />
                        </div>
                    </div>

                    <div className="divide-y ">
                        {filteredTemplates.map((template) => (
                            <Link
                                key={template.id}
                                className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
                                href={`/${template?._id}`}>
                                <div className="flex-1 pl-4">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-lg font-semibold text-blue-600">
                                            {template.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {template.description}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-8">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center justify-between gap-2 py-2 h-auto"
                                    >
                                        <Download className="h-4 w-4"/>
                                        {template.downloads}
                                    </Button>
                                    <CopyButton variant="outline" copyContent={`scaf run ${template.name}`}/>
                                    <ChevronRight/>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
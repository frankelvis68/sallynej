"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property, PropertyType, ListingType, PricePeriod } from "@/types";
import { formatCurrency } from "@/lib/currency";
import { SITE } from "@/config/site";
import {
  Building2,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  Lock,
  Search,
  CheckCircle2,
  AlertCircle,
  Home,
  Check,
  X,
} from "lucide-react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "house" as PropertyType,
    listingType: "sale" as ListingType,
    price: "",
    pricePeriod: "total" as PricePeriod,
    location: "",
    area: "katampe",
    bedrooms: "",
    bathrooms: "",
    sizeSqm: "",
    description: "",
    imageSrc: "/images/hero.jpg",
    featured: false,
  });
  const [formMessage, setFormMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);

  // Check initial authentication
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        setAuthenticated(data.authenticated);
        if (data.authenticated) {
          fetchProperties();
        }
      })
      .catch(() => setAuthenticated(false));
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/properties");
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (err) {
      console.error("Failed to load properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (res.ok) {
        setAuthenticated(true);
        fetchProperties();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid password");
      }
    } catch {
      setLoginError("Login failed");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
  };

  const handleOpenAddModal = () => {
    setEditingSlug(null);
    setFormData({
      title: "",
      type: "house",
      listingType: "sale",
      price: "",
      pricePeriod: "total",
      location: "",
      area: "katampe",
      bedrooms: "",
      bathrooms: "",
      sizeSqm: "",
      description: "",
      imageSrc: "/images/hero.jpg",
      featured: false,
    });
    setFormMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (property: Property) => {
    setEditingSlug(property.slug);
    setFormData({
      title: property.title,
      type: property.type,
      listingType: property.listingType,
      price: property.price.toString(),
      pricePeriod: property.pricePeriod,
      location: property.location,
      area: property.area,
      bedrooms: property.bedrooms ? property.bedrooms.toString() : "",
      bathrooms: property.bathrooms ? property.bathrooms.toString() : "",
      sizeSqm: property.sizeSqm ? property.sizeSqm.toString() : "",
      description: property.description,
      imageSrc: property.images[0]?.src || "/images/hero.jpg",
      featured: property.featured,
    });
    setFormMessage(null);
    setIsModalOpen(true);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormMessage(null);

    const payload = {
      title: formData.title,
      type: formData.type,
      listingType: formData.listingType,
      price: Number(formData.price),
      pricePeriod: formData.pricePeriod,
      location: formData.location,
      area: formData.area,
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
      sizeSqm: formData.sizeSqm ? Number(formData.sizeSqm) : undefined,
      description: formData.description,
      images: [{ src: formData.imageSrc, alt: formData.title }],
      featured: formData.featured,
    };

    try {
      if (editingSlug) {
        // Edit existing
        const res = await fetch(`/api/admin/properties/${editingSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setFormMessage({ text: "Property updated successfully!", type: "success" });
          fetchProperties();
          setTimeout(() => setIsModalOpen(false), 800);
        } else {
          setFormMessage({ text: "Failed to update property", type: "error" });
        }
      } else {
        // Create new
        const res = await fetch("/api/admin/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setFormMessage({ text: "Property created successfully!", type: "success" });
          fetchProperties();
          setTimeout(() => setIsModalOpen(false), 800);
        } else {
          setFormMessage({ text: "Failed to create property", type: "error" });
        }
      }
    } catch {
      setFormMessage({ text: "An error occurred while saving", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProperty = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to remove the listing: "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/properties/${slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        alert("Failed to delete property");
      }
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  };

  // Filter properties in view
  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || p.listingType === filterType;
    return matchesSearch && matchesType;
  });

  // 1. Loading screen
  if (authenticated === null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f7f9fc]">
        <div className="text-sm font-semibold text-[#454652]">Loading Portal...</div>
      </div>
    );
  }

  // 2. Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 bg-[#f7f9fc]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-xl flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#24389c]/10 text-[#24389c] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#191c1e]">
              Admin Control Portal
            </h1>
            <p className="text-xs text-[#454652]">
              Authenticate to manage listings and website configurations for {SITE.brandName}.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#191c1e]">
                Master Administrator Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="h-11 px-3.5 rounded-lg bg-[#f2f4f7] text-sm text-[#191c1e] border border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c] transition-all"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="h-11 bg-[#24389c] hover:bg-[#1b2b7b] disabled:bg-gray-400 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer mt-2"
            >
              {loggingIn ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#e2e8f0]">
            <Link href="/" className="text-xs text-[#24389c] hover:underline">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Admin Dashboard
  return (
    <div className="min-h-screen bg-[#f7f9fc] py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Control Bar */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#24389c] text-white flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#191c1e]">
                Operations &amp; Listings Control
              </h1>
              <p className="text-xs text-[#454652]">
                Active catalog management for {SITE.legalName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-xs font-semibold text-[#191c1e] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#24389c] hover:bg-[#1b2b7b] text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Property</span>
            </button>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#454652] uppercase font-semibold">Total Listings</span>
              <p className="text-2xl font-bold text-[#191c1e] mt-1">{properties.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#24389c]/10 text-[#24389c] flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#454652] uppercase font-semibold">For Sale</span>
              <p className="text-2xl font-bold text-[#191c1e] mt-1">
                {properties.filter((p) => p.listingType === "sale").length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#454652] uppercase font-semibold">Rentals &amp; Leases</span>
              <p className="text-2xl font-bold text-[#191c1e] mt-1">
                {properties.filter((p) => p.listingType === "rent").length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#3f51b5]/10 text-[#3f51b5] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#454652] uppercase font-semibold">Short Lets</span>
              <p className="text-2xl font-bold text-[#191c1e] mt-1">
                {properties.filter((p) => p.listingType === "short-let").length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#fdd275]/40 text-[#795902] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Listings Search and Filter Controls */}
        <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#454652] absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by title or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f2f4f7] text-xs font-medium text-[#191c1e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-[#454652]">Category:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#24389c] cursor-pointer"
            >
              <option value="all">All Purpose</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="short-let">Short Let</option>
            </select>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#191c1e]">
              <thead className="bg-[#f2f4f7] border-b border-[#e2e8f0] text-[#454652] uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Title &amp; Location</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Specs</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#454652]">
                      Loading listings...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#454652]">
                      No properties found matching criteria. Click &quot;Add Property&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-[#f7f9fc] transition-colors">
                      <td className="py-3 px-4 w-20">
                        <div className="relative w-14 h-11 rounded-lg overflow-hidden bg-[#eceef1]">
                          <Image
                            src={p.images[0]?.src || "/images/hero.jpg"}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <Link
                          href={`/properties/${p.slug}`}
                          target="_blank"
                          className="font-bold text-sm text-[#191c1e] hover:text-[#24389c] transition-colors line-clamp-1"
                        >
                          {p.title}
                        </Link>
                        <span className="text-[11px] text-[#454652] block truncate">
                          {p.location}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#24389c]/10 text-[#24389c] uppercase">
                          {p.listingType}
                        </span>
                        <span className="block text-[10px] text-[#454652] capitalize mt-0.5">
                          {p.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-sm text-[#24389c]">
                        {formatCurrency(p.price, p.pricePeriod)}
                      </td>
                      <td className="py-3 px-4 text-[#454652]">
                        {p.bedrooms ? `${p.bedrooms} Beds • ` : ""}
                        {p.bathrooms ? `${p.bathrooms} Baths • ` : ""}
                        {p.sizeSqm ? `${p.sizeSqm}m²` : "Titled"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/properties/${p.slug}`}
                            target="_blank"
                            title="View Live Listing"
                            className="p-1.5 rounded-md hover:bg-[#f2f4f7] text-[#454652] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(p)}
                            title="Edit Listing"
                            className="p-1.5 rounded-md hover:bg-[#24389c]/10 text-[#24389c] transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProperty(p.slug, p.title)}
                            title="Remove Listing"
                            className="p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#e2e8f0] my-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
              <h2 className="text-xl font-bold text-[#191c1e]">
                {editingSlug ? "Edit Property Listing" : "Add New Property Listing"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#f2f4f7] text-[#454652]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="flex flex-col gap-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#191c1e]">Listing Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 4-Bedroom Terrace Duplex in Katampe"
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#191c1e]">Purpose *</label>
                  <select
                    value={formData.listingType}
                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value as ListingType })}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium cursor-pointer"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="short-let">Short Let</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#191c1e]">Property Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as PropertyType })}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium cursor-pointer"
                  >
                    <option value="house">House / Duplex</option>
                    <option value="flat">Serviced Apartment / Flat</option>
                    <option value="land">Residential / Commercial Land</option>
                    <option value="commercial">Commercial Hub</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#191c1e]">Price (₦) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 550000000"
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#191c1e]">Price Billing Period</label>
                  <select
                    value={formData.pricePeriod}
                    onChange={(e) => setFormData({ ...formData, pricePeriod: e.target.value as PricePeriod })}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium cursor-pointer"
                  >
                    <option value="total">Total (Outright Purchase / Land)</option>
                    <option value="year">Per Year (Lease / Rent)</option>
                    <option value="night">Per Night (Short Let)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#191c1e]">District / Area *</label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium cursor-pointer"
                  >
                    {SITE.areasServed.map((area) => (
                      <option key={area.slug} value={area.slug}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#191c1e]">Full Location Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Katampe Extension, Abuja FCT"
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#191c1e]">Bedrooms (Optional)</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    placeholder="e.g. 4"
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#191c1e]">Bathrooms (Optional)</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    placeholder="e.g. 5"
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#191c1e]">Land / Property Size (sqm)</label>
                  <input
                    type="number"
                    value={formData.sizeSqm}
                    onChange={(e) => setFormData({ ...formData, sizeSqm: e.target.value })}
                    placeholder="e.g. 650"
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#191c1e]">Image Path / URL</label>
                  <input
                    type="text"
                    value={formData.imageSrc}
                    onChange={(e) => setFormData({ ...formData, imageSrc: e.target.value })}
                    placeholder="/images/properties/prop-1.jpg"
                    className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#191c1e]">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe amenities, titles, finishes..."
                    className="p-3 rounded-lg bg-[#f2f4f7] text-xs font-medium resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c]"
                  />
                </div>

                <div className="flex items-center gap-2 sm:col-span-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#24389c] cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs font-semibold text-[#191c1e] cursor-pointer">
                    Show as Featured Property on Homepage
                  </label>
                </div>
              </div>

              {formMessage && (
                <div
                  className={`p-3 text-xs rounded-lg flex items-center gap-2 ${
                    formMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {formMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{formMessage.text}</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#454652] hover:bg-[#f2f4f7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-[#24389c] hover:bg-[#1b2b7b] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  {saving ? "Saving..." : editingSlug ? "Save Changes" : "Publish Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

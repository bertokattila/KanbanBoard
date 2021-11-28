(this.webpackJsonpkanbanboard = this.webpackJsonpkanbanboard || []).push([
	[0],
	{
		141: function (e, t, n) {
			'use strict';
			n.r(t);
			var a = n(0),
				r = n(27),
				o = n.n(r),
				i = n(105),
				c = n(16),
				d = n(192),
				s = n(36),
				l = n(20),
				u = n(195),
				j = n(193),
				b = n(199),
				x = n(200),
				f = n(201),
				h = n(59),
				m = n(194),
				p = n(186),
				O = n(185),
				g = n(196),
				v = n(181),
				C = n(191),
				y = n(198),
				w = n(188),
				S = n(1),
				k = {
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
					display: 'flex',
					flexDirection: 'column',
				},
				I = function (e) {
					var t = e.data,
						n = e.editCard,
						r = a.useState(!1),
						o = Object(c.a)(r, 2),
						i = o[0],
						d = o[1],
						s = Object(a.useRef)(),
						l = function () {
							return d(!1);
						},
						b = a.useState('pending'),
						x = Object(c.a)(b, 2),
						f = x[0],
						h = x[1],
						I = a.useState(t.state),
						P = Object(c.a)(I, 2),
						E = P[0],
						R = P[1],
						T = Object(a.useRef)(),
						D = Object(a.useRef)();
					return Object(S.jsxs)('div', {
						display: 'block',
						children: [
							Object(S.jsx)(j.a, {
								onClick: function () {
									d(!0);
								},
								size: 'small',
								children: 'Edit',
							}),
							Object(S.jsx)(p.a, {
								open: i,
								onClose: l,
								'aria-labelledby': 'modal-modal-title',
								children: Object(S.jsxs)(m.a, {
									sx: k,
									children: [
										Object(S.jsx)(u.a, {
											id: 'modal-modal-title',
											variant: 'h5',
											sx: { mb: '1rem', mt: '1rem' },
											children: 'Edit Card',
										}),
										Object(S.jsx)(O.a, {
											sx: { my: '1rem' },
											label: 'Title',
											type: 'text',
											inputRef: T,
											required: !0,
											defaultValue: t.title,
											onChange: function () {
												f || h(!0);
											},
											error: !f,
										}),
										' ',
										Object(S.jsx)(O.a, {
											sx: { my: '1rem' },
											label: 'Description',
											type: 'text',
											defaultValue: t.description,
											inputRef: s,
										}),
										Object(S.jsxs)(g.a, {
											component: 'fieldset',
											children: [
												Object(S.jsx)(v.a, {
													component: 'legend',
													children: 'Status',
												}),
												Object(S.jsxs)(C.a, {
													row: !0,
													'aria-label': 'status',
													name: 'row-radio-buttons-group',
													onChange: function (e, t) {
														R(t);
													},
													value: E,
													children: [
														Object(S.jsx)(y.a, {
															value: 'Pending',
															control: Object(S.jsx)(w.a, {}),
															label: 'Pending',
														}),
														Object(S.jsx)(y.a, {
															value: 'Progress',
															control: Object(S.jsx)(w.a, {}),
															label: 'In Progress',
														}),
														Object(S.jsx)(y.a, {
															value: 'Done',
															control: Object(S.jsx)(w.a, {}),
															label: 'Done',
														}),
														Object(S.jsx)(y.a, {
															value: 'Postponed',
															control: Object(S.jsx)(w.a, {}),
															label: 'Postponed',
														}),
													],
												}),
											],
										}),
										Object(S.jsx)(O.a, {
											id: 'date',
											type: 'date',
											defaultValue: t.deadline,
											inputRef: D,
											sx: { width: 220, my: '1rem' },
										}),
										Object(S.jsx)(j.a, {
											sx: { my: '1rem' },
											variant: 'outlined',
											color: 'secondary',
											onClick: function () {
												T.current.value.length <= 0
													? h(!1)
													: (n(t.id, [
															T.current.value,
															s.current.value,
															D.current.value,
															E,
													  ]),
													  l());
											},
											children: 'Save',
										}),
									],
								}),
							}),
						],
					});
				},
				P = n(197),
				E = function (e) {
					var t = e.data,
						n = e.removeCard,
						a = e.index,
						r = e.editCard,
						o = function (e) {
							switch (e) {
								case 'Pending':
									return '#b28704';
								case 'Postponed':
									return '#aa2e25';
								case 'Progress':
									return '#482880';
								case 'Done':
									return '#357a38';
								default:
									return 'grey';
							}
						};
					return Object(S.jsx)(
						h.b,
						{
							draggableId: t.id.toString(),
							index: a,
							children: function (e) {
								return Object(S.jsxs)(
									b.a,
									Object(s.a)(
										Object(s.a)(
											Object(s.a)({}, e.draggableProps),
											e.dragHandleProps
										),
										{},
										{
											ref: e.innerRef,
											sx: { maxWidth: '100%', marginTop: '1rem' },
											children: [
												Object(S.jsxs)(x.a, {
													children: [
														Object(S.jsx)(P.a, {
															elevation: 0,
															sx: {
																width: 'fit-content',
																background: o(t.state),
															},
															children: Object(S.jsx)(u.a, {
																sx: {
																	fontSize: 14,
																	padding: '5px',
																	fontWeight: 'bold',
																},
																color: 'text.secondary',
																gutterBottom: !0,
																children: t.state,
															}),
														}),
														Object(S.jsx)(u.a, {
															variant: 'h5',
															component: 'div',
															sx: { wordBreak: 'break-all' },
															children: t.title,
														}),
														Object(S.jsx)(u.a, {
															sx: { mb: 1.5, wordBreak: 'break-all' },
															color: 'text.secondary',
															children: t.description,
														}),
														Object(S.jsx)(u.a, {
															variant: 'body2',
															children: t.deadline,
														}),
													],
												}),
												Object(S.jsxs)(f.a, {
													children: [
														Object(S.jsx)(j.a, {
															onClick: function () {
																n(t.id);
															},
															size: 'small',
															children: 'Remove',
														}),
														Object(S.jsx)(I, { data: t, editCard: r }),
													],
												}),
											],
										}
									)
								);
							},
						},
						t.id
					);
				},
				R = n(114),
				T = {
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
					display: 'flex',
					flexDirection: 'column',
				},
				D = function (e) {
					var t = e.data,
						n = e.addCard,
						r = a.useState(!1),
						o = Object(c.a)(r, 2),
						i = o[0],
						d = o[1],
						s = function () {
							return d(!1);
						},
						l = a.useState('pending'),
						b = Object(c.a)(l, 2),
						x = b[0],
						f = b[1],
						h = 'Pending',
						k = a.useState(h),
						I = Object(c.a)(k, 2),
						P = I[0],
						E = I[1],
						D = Object(a.useRef)(),
						B = Object(a.useRef)(),
						J = Object(a.useRef)();
					return Object(S.jsxs)('div', {
						display: 'block',
						children: [
							Object(S.jsx)(j.a, {
								variant: 'contained',
								onClick: function () {
									return d(!0);
								},
								children: 'New card',
							}),
							Object(S.jsx)(p.a, {
								open: i,
								onClose: s,
								'aria-labelledby': 'modal-modal-title',
								children: Object(S.jsxs)(m.a, {
									sx: T,
									children: [
										Object(S.jsx)(u.a, {
											id: 'modal-modal-title',
											variant: 'h5',
											sx: { mb: '1rem', mt: '1rem' },
											children: 'Add new Card',
										}),
										Object(S.jsx)(O.a, {
											sx: { my: '1rem' },
											label: 'Title',
											type: 'text',
											inputRef: D,
											required: !0,
											onChange: function () {
												x || f(!0);
											},
											error: !x,
										}),
										' ',
										Object(S.jsx)(O.a, {
											sx: { my: '1rem' },
											label: 'Description',
											type: 'text',
											inputRef: J,
										}),
										Object(S.jsxs)(g.a, {
											component: 'fieldset',
											children: [
												Object(S.jsx)(v.a, {
													component: 'legend',
													children: 'Status',
												}),
												Object(S.jsxs)(C.a, {
													row: !0,
													'aria-label': 'status',
													name: 'row-radio-buttons-group',
													onChange: function (e, t) {
														E(t);
													},
													defaultValue: h,
													children: [
														Object(S.jsx)(y.a, {
															value: 'Pending',
															control: Object(S.jsx)(w.a, {}),
															label: 'Pending',
														}),
														Object(S.jsx)(y.a, {
															value: 'Progress',
															control: Object(S.jsx)(w.a, {}),
															label: 'In Progress',
														}),
														Object(S.jsx)(y.a, {
															value: 'Done',
															control: Object(S.jsx)(w.a, {}),
															label: 'Done',
														}),
														Object(S.jsx)(y.a, {
															value: 'Postponed',
															control: Object(S.jsx)(w.a, {}),
															label: 'Postponed',
														}),
													],
												}),
											],
										}),
										Object(S.jsx)(O.a, {
											id: 'date',
											type: 'date',
											defaultValue: Object(R.a)(new Date(), 'yyyy-MM-dd'),
											inputRef: B,
											sx: { width: 220, my: '1rem' },
										}),
										Object(S.jsx)(j.a, {
											sx: { my: '1rem' },
											variant: 'outlined',
											color: 'secondary',
											onClick: function () {
												D.current.value.length <= 0
													? f(!1)
													: (n(
															t.id,
															D.current.value,
															J.current.value,
															B.current.value,
															P
													  ),
													  s());
											},
											children: 'Add Card',
										}),
									],
								}),
							}),
						],
					});
				},
				B = n(110),
				J = n.n(B),
				N = function (e) {
					var t = e.addCard,
						n = e.removeCard,
						a = e.data,
						r = e.editCard,
						o = e.removeCol,
						i = function (e) {
							n(a.id, e);
						},
						c = function (e, t) {
							r.apply(void 0, [a.id, e].concat(Object(l.a)(t)));
						};
					return Object(S.jsxs)(d.a, {
						item: !0,
						container: !0,
						direction: 'column',
						xs: 6,
						md: 6,
						lg: 3,
						xl: 2,
						sx: { padding: '1rem' },
						children: [
							Object(S.jsx)(d.a, {
								item: !0,
								children: Object(S.jsx)(u.a, {
									variant: 'h4',
									align: 'center',
									children: a.title,
								}),
							}),
							Object(S.jsxs)(d.a, {
								item: !0,
								container: !0,
								direction: 'row',
								justifyContent: 'space-between',
								sx: { paddingTop: '1rem' },
								children: [
									Object(S.jsx)(D, {
										addCard: t,
										data: a,
										sx: { marginBottom: '1rem' },
									}),
									Object(S.jsx)(j.a, {
										'aria-label': 'delete',
										onClick: function () {
											o(a.id);
										},
										variant: 'outlined',
										startIcon: Object(S.jsx)(J.a, { fontSize: 'inherit' }),
										children: 'Remove',
									}),
								],
							}),
							Object(S.jsx)(d.a, {
								item: !0,
								children: Object(S.jsx)(h.c, {
									droppableId: a.id.toString(),
									children: function (e) {
										return Object(S.jsxs)(
											'div',
											Object(s.a)(
												Object(s.a)({ ref: e.innerRef }, e.droppableProps),
												{},
												{
													children: [
														a.cards.map(function (e, t) {
															return Object(S.jsx)(
																E,
																{
																	data: e,
																	removeCard: i,
																	index: t,
																	editCard: c,
																},
																e.id
															);
														}),
														e.placeholder,
													],
												}
											)
										);
									},
								}),
							}),
						],
					});
				},
				A = function (e) {
					var t = e.columns,
						n = e.addCard,
						a = e.removeCard,
						r = e.cardColSwitch,
						o = e.editCard,
						i = e.removeCol;
					return Object(S.jsx)(d.a, {
						container: !0,
						direction: 'row',
						item: !0,
						children: t.map(function (e, t) {
							return Object(S.jsx)(
								N,
								{
									data: e,
									addCard: n,
									removeCard: a,
									cardColSwitch: r,
									editCard: o,
									removeCol: i,
								},
								t
							);
						}),
					});
				},
				V = n(111),
				z = n.n(V),
				q = n(202),
				L = {
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
					display: 'flex',
					flexDirection: 'column',
				},
				M = function (e) {
					var t = e.addColumn,
						n = a.useState(!1),
						r = Object(c.a)(n, 2),
						o = r[0],
						i = r[1],
						d = a.useState(!0),
						s = Object(c.a)(d, 2),
						l = s[0],
						b = s[1],
						x = function () {
							return i(!1);
						},
						f = Object(a.useRef)('');
					return Object(S.jsxs)('div', {
						children: [
							Object(S.jsxs)(q.a, {
								variant: 'extended',
								'aria-label': 'add',
								onClick: function () {
									return i(!0);
								},
								color: 'secondary',
								children: [Object(S.jsx)(z.a, {}), 'New Column'],
							}),
							Object(S.jsx)(p.a, {
								open: o,
								onClose: x,
								'aria-labelledby': 'modal-modal-title',
								children: Object(S.jsxs)(m.a, {
									sx: L,
									children: [
										Object(S.jsx)(u.a, {
											id: 'modal-modal-title',
											variant: 'h5',
											sx: { mt: '1rem', padding: 0 },
											children: 'Add new column',
										}),
										Object(S.jsx)(O.a, {
											sx: { my: '1rem' },
											id: 'outlined-title-input',
											label: 'Title',
											type: 'text',
											inputRef: f,
											required: !0,
											onChange: function () {
												l || b(!0);
											},
											error: !l,
										}),
										Object(S.jsx)(j.a, {
											sx: { my: '1rem' },
											variant: 'outlined',
											color: 'secondary',
											onClick: function () {
												f.current.value.length > 0
													? (t(f.current.value), x())
													: b(!1);
											},
											children: 'Add Column',
										}),
									],
								}),
							}),
						],
					});
				},
				U = function (e) {
					var t = e.addColumn;
					return Object(S.jsxs)(d.a, {
						item: !0,
						xs: 12,
						container: !0,
						direction: 'column',
						sx: { marginBottom: '1rem' },
						children: [
							Object(S.jsx)(d.a, {
								item: !0,
								children: Object(S.jsx)(u.a, {
									variant: 'h2',
									align: 'center',
									sx: { marginTop: '3rem', marginBottom: '3rem' },
									children: 'Kanban Board',
								}),
							}),
							Object(S.jsx)(M, { addColumn: t }),
							Object(S.jsx)(d.a, { item: !0 }),
						],
					});
				};
			var W = function () {
					var e = Object(a.useState)([]),
						t = Object(c.a)(e, 2),
						n = t[0],
						r = t[1],
						o = Object(a.useState)(!1),
						s = Object(c.a)(o, 2),
						l = s[0],
						u = s[1],
						j = Object(a.useState)(!1),
						b = Object(c.a)(j, 2),
						x = b[0],
						f = b[1],
						m = 'http://localhost:5000';
					return (
						Object(a.useEffect)(function () {
							fetch(m + '/api/column/board/')
								.then(function (e) {
									if (e.ok) return e.json();
									throw new Error('Something went wrong');
								})
								.then(
									function (e) {
										u(!0);
										var t,
											n = Object(i.a)(e);
										try {
											for (n.s(); !(t = n.n()).done; ) {
												t.value.cards.sort(function (e, t) {
													return e.position - t.position;
												});
											}
										} catch (a) {
											n.e(a);
										} finally {
											n.f();
										}
										r(e);
									},
									function (e) {
										f(!0), console.log(e);
									}
								);
						}, []),
						x
							? Object(S.jsx)('h1', {
									children: 'Error occured, please refresh',
							  })
							: l
							? Object(S.jsx)(h.a, {
									onDragEnd: function (e) {
										if (e.destination) {
											var t = parseInt(e.source.droppableId),
												a = parseInt(e.destination.droppableId),
												o = parseInt(e.draggableId),
												i = n.slice(),
												c = i.findIndex(function (e) {
													return e.id === t;
												}),
												d = i.findIndex(function (e) {
													return e.id === a;
												}),
												s = i[c].cards.findIndex(function (e) {
													return e.id === o;
												}),
												l = i[c].cards[s];
											i[c].cards.splice(s, 1),
												i[d].cards.splice(e.destination.index, 0, l),
												r(i),
												fetch(m + '/api/card/' + o + '/location/', {
													method: 'PUT',
													headers: { 'Content-Type': 'application/json' },
													body: JSON.stringify({
														cardId: o,
														newColId: a,
														newPos: e.destination.index,
													}),
												}).then(
													function (e) {
														200 !== e.status && f(!0);
													},
													function (e) {
														console.log(e), f(!0);
													}
												);
										}
									},
									children: Object(S.jsx)(d.a, {
										container: !0,
										alignItems: 'center',
										justifyContent: 'center',
										children: Object(S.jsxs)(d.a, {
											item: !0,
											container: !0,
											xs: 10,
											alignItems: 'center',
											justifyContent: 'center',
											children: [
												Object(S.jsx)(U, {
													addColumn: function (e) {
														fetch(m + '/api/column/', {
															method: 'POST',
															headers: { 'Content-Type': 'application/json' },
															body: JSON.stringify({ title: e }),
														})
															.then(function (e) {
																if (e.ok) return e.json();
																throw new Error('Something went wrong');
															})
															.then(
																function (e) {
																	var t = n.slice();
																	t.push({
																		id: e.id,
																		title: e.title,
																		cards: [],
																	}),
																		r(t);
																},
																function (e) {
																	console.log(e), f(!0);
																}
															);
													},
												}),
												Object(S.jsx)(A, {
													columns: n,
													addCard: function (e, t, a, o, i) {
														fetch(m + '/api/card/', {
															method: 'POST',
															headers: { 'Content-Type': 'application/json' },
															body: JSON.stringify({
																columnId: e,
																title: t,
																description: a,
																deadline: o,
																state: i,
															}),
														})
															.then(function (e) {
																if (e.ok) return e.json();
																throw new Error('Something went wrong');
															})
															.then(
																function (c) {
																	var d = n.slice(),
																		s = d.findIndex(function (t) {
																			return t.id === e;
																		});
																	d[s].cards.push({
																		columnId: e,
																		id: c.id,
																		title: t,
																		description: a,
																		deadline: o,
																		state: i,
																	}),
																		r(d);
																},
																function (e) {
																	console.log(e), f(!0);
																}
															);
													},
													removeCard: function (e, t) {
														fetch(m + '/api/card/' + t, { method: 'DELETE' })
															.then(function (e) {
																if (e.ok) return e;
																throw new Error('Something went wrong');
															})
															.then(
																function (a) {
																	if (200 === a.status) {
																		var o = n.slice(),
																			i = o.findIndex(function (t) {
																				return t.id === e;
																			}),
																			c = o[i].cards.findIndex(function (e) {
																				return e.id === t;
																			});
																		c > -1 && o[i].cards.splice(c, 1), r(o);
																	} else f(!0);
																},
																function (e) {
																	console.log(e), f(!0);
																}
															);
													},
													editCard: function (e, t, a, o, i, c) {
														fetch(m + '/api/card/' + t, {
															method: 'PUT',
															headers: { 'Content-Type': 'application/json' },
															body: JSON.stringify({
																id: t,
																title: a,
																description: o,
																deadline: i,
																state: c,
															}),
														})
															.then(function (e) {
																if (e.ok) return e.json();
																throw new Error('Something went wrong');
															})
															.then(
																function (e) {
																	e.id !== t && f(!0);
																},
																function (e) {
																	console.log(e), f(!0);
																}
															);
														var d = n.slice(),
															s = d.findIndex(function (t) {
																return t.id === e;
															}),
															l = d[s].cards.findIndex(function (e) {
																return e.id === t;
															});
														l > -1 &&
															((d[s].cards[l].title = a),
															(d[s].cards[l].description = o),
															(d[s].cards[l].deadline = i),
															(d[s].cards[l].state = c)),
															r(d);
													},
													removeCol: function (e) {
														fetch(m + '/api/column/' + e, { method: 'DELETE' })
															.then(function (e) {
																if (e.ok) return e;
																throw new Error('Something went wrong');
															})
															.then(
																function () {
																	var t = n.slice(),
																		a = t.findIndex(function (t) {
																			return t.id === e;
																		});
																	t.splice(a, 1), r(t);
																},
																function (e) {
																	console.log(e), f(!0);
																}
															);
													},
												}),
											],
										}),
									}),
							  })
							: Object(S.jsx)('h1', { children: 'Loading...' })
					);
				},
				H = n(113),
				K = n(190),
				F = n(183),
				G = n(184),
				Q = n(182),
				X = Object(H.a)({ palette: { mode: 'dark' } });
			o.a.render(
				Object(S.jsx)(K.a, {
					theme: X,
					children: Object(S.jsxs)(Q.a, {
						dateAdapter: G.a,
						children: [Object(S.jsx)(F.a, {}), Object(S.jsx)(W, {})],
					}),
				}),
				document.getElementById('root')
			);
		},
	},
	[[141, 1, 2]],
]);
//# sourceMappingURL=main.35f4e0c9.chunk.js.map
